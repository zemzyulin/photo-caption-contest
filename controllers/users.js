const User = require('../models').User;
const Caption = require('../models').Caption;

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
            let user = await User.create({
                username: req.body.username,
                password: req.body.password
            })
            return res.status(201).send(user);
        } catch(error) {
            return res.status(400).send(error);
        }
    },
    async getById(req, res) {
        try {
            let user = await User.findByPk(req.params.id, {
                include: [{
                    model: Caption,
                    as: 'captions'
                }]
            })
            if (!user) {
                return res.status(404).send({ message: 'User not found'})
            }
            return res.status(200).send(user);
        } catch(error) {
            return res.status(400).send(error);
        }
    },
    async updateById(req, res) {
        try {
            let user = await User.findByPk(req.params.id)
            if (!user) {
                return res.status(404).send({ message: 'User not found'})
            }
            await user.update({
                username: req.body.username || user.username,
                password: req.body.password || user.password
            })
            return res.status(200).send(user)
        } catch(error) {
            return res.status(400).send(error);
        }
    },
    async deleteById(req, res) {
        try {
            let user = await User.findByPk(req.params.id);
            if (!user) {
                return res.status(404).send({ message: 'User not found'})
            }
            await user.destroy();
            return res.status(204).send();
        } catch(error) {
            return res.status(400).send(error);
        }
    }
}

