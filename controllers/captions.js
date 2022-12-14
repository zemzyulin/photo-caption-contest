const Caption = require('../models').Caption;
const Photo = require('../models').Photo;
const User = require('../models').User;

const CashService = require('./cache');
const cache = new CashService(3600);
const KEY = 'captions';

module.exports = {
    async list(req, res) {
        try {
            let captions = await Caption.findAll({
                order: [['createdAt', 'DESC']]
            });
            return res.status(200).send(captions);
        } catch {error} {
            return res.status(400).send(error);
        }
    },
    async add(req, res) {
        try {
            let caption = await Caption.create({
                content: req.body.content,
                usersId: req.user.id,
                photosId: req.body.photosId
            })
            return res.status(201).send(caption);
        } catch(error) {
            return res.status(400).send(error);
        }
    },
    async getById(req, res) {
        try {
            let caption = await cache.get(`${KEY}_${req.params.id}`, () => {
                return Caption.findByPk(req.params.id, {
                    include: [{
                        model: Photo,
                        as: 'photo'
                    }, {
                        model: User,
                        as: 'user',
                        attributes: { exclude: ['password'] }
                    }]
                });
            });
            if (!caption) {
                return res.status(404).send({ message: 'Caption not found' })
            }
            return res.status(200).send(caption);
        } catch(error) {
            return res.status(400).send(error);
        }
    },
    async updateById(req, res) {
        try {
            let caption = await Caption.findByPk(req.params.id)
            if (!caption) {
                return res.status(404).send({ message: 'Caption not found' })
            }
            // authorize edit
            if (caption.usersId !== req.user.id) {
                return res.status(403).send({ message: 'You are not authorized to update this caption' })
            }
            // update caption
            await caption.update({
                content: req.body.content || caption.content
            })
            cache.del(`${KEY}_${req.params.id}`);
            return res.status(200).send(caption)
        } catch(error) {
            return res.status(400).send(error);
        }
    },
    async deleteById(req, res) {
        try {
            let caption = await Caption.findByPk(req.params.id);
            if (!caption) {
                return res.status(404).send({ message: 'Caption not found' })
            }
            // authorize delete
            if (caption.usersId !== req.user.id) {
                return res.status(403).send({ message: 'You are not authorized to delete this caption' })
            }
            // delete caption
            await caption.destroy();
            cache.del(`${KEY}_${req.params.id}`);
            return res.status(204).send();
        } catch(error) {
            return res.status(400).send(error);
        }
    }
}

