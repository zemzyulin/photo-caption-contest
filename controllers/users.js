const User = require('../models').User;
const Caption = require('../models').Caption;
const bcrypt = require('bcrypt');
const saltRounds = 11;

const CashService = require('./cache');
const cache = new CashService(3600);
const KEY = 'users';

module.exports = {
    async list(req, res) {
        try {
            let users = await User.findAll({
                order: [['createdAt', 'DESC']]
            });
            return res.status(200).send(users);
        } catch {error} {
            return res.status(400).send(error);
        }
    },
    async add(req, res) {
        try {
            bcrypt.hash(req.body.password, saltRounds, async function(err, hash) {
                let user = await User.create({
                    username: req.body.username,
                    password: hash
                })
                return res.status(201).send(user);
            })
        } catch(error) {
            return res.status(400).send(error);
        }
    },
    async getById(req, res) {
        try {
            let user = await cache.get(`${KEY}_${req.params.id}`, () => {
                return User.findByPk(req.params.id, {
                    include: [{
                        model: Caption,
                        as: 'captions'
                    }]
                })
            });
            if (!user) {
                return res.status(404).send({ message: 'User not found' })
            }
            return res.status(200).send(user);
        } catch(error) {
            return res.status(400).send(error);
        }
    },
    async updateById(req, res) {
        try {
            // check if authorized
            if (req.params.id !== req.user.id.toString()) {
                return res.status(403).send({ message: 'You are not authorized to update this user' });
            }
            // find user
            let user = await User.findByPk(req.params.id);
            if (!user) {
                return res.status(404).send({ message: 'User not found' })
            }
            // update user
            bcrypt.hash(req.body.password, saltRounds, async function(err, hash) {
                await user.update({
                    username: req.body.username || user.username,
                    password: hash || user.password
            })
            cache.del(`${KEY}_${req.params.id}`);
            return res.status(200).send(user)
            });
        } catch(error) {
            return res.status(400).send(error);
        }
    },
    async deleteById(req, res) {
        try {
            // check if authorized
            if (req.params.id !== req.user.id.toString()) {
                return res.status(403).send({ message: 'You are not authorized to delete this user' });
            }
            // delete user
            let user = await User.findByPk(req.params.id);
            if (!user) {
                return res.status(404).send({ message: 'User not found' })
            }
            await user.destroy();
            cache.del(`${KEY}_${req.params.id}`);
            return res.status(204).send();
        } catch(error) {
            return res.status(400).send(error);
        }
    },
    async login(req, res) {
        try {
            let user = await User.findOne({ where: { username: req.body.username }});
            // check user
            if (!user) {
                return res.status(404).send({ message: 'Incorrect username' });
            }
            // check pass
            let checkPass = await bcrypt.compare(req.body.password, user.password);
            if (!checkPass) {
                return res.status(400).send({ message: 'Incorrect password' });
            }
            const token = user.generateJWT();
            return res.header('authorization', token).status(200).send({
                id: user.id,
                username: user.username,
                token: token
            });
        } catch(error) {
            res.status(400).send(error);
        }
    }
}

