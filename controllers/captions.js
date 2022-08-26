const Caption = require('../models').Caption;
const Photo = require('../models').Photo;
const User = require('../models').User;


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
                caption: req.body.caption,
                users_id: req.user.id,
                photos_id: req.body.photos_id
            })
            return res.status(201).send(caption);
        } catch(error) {
            return res.status(400).send(error);
        }
    },
    async getById(req, res) {
        try {
            let caption = await Caption.findByPk(req.params.id, {
                include: [{
                    model: Photo,
                    as: 'photo'
                }, {
                    model: User,
                    as: 'user'
                }]
            });
            if (!caption) {
                return res.status(404).send({ message: 'Caption not found'})
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
                return res.status(404).send({ message: 'Caption not found'})
            }
            console.log(caption.users_id);
            console.log(req.user.id);
            // authorize edit
            if (caption.users_id !== req.user.id) {
                return res.status(403).send({ message: 'You are not authorized to update this caption' })
            }
            // update caption
            await caption.update({
                caption: req.body.caption || caption.caption
            })
            return res.status(200).send(caption)
        } catch(error) {
            return res.status(400).send(error);
        }
    },
    async deleteById(req, res) {
        try {
            let caption = await Caption.findByPk(req.params.id);
            if (!caption) {
                return res.status(404).send({ message: 'Caption not found'})
            }
            // authorize delete
            if (caption.users_id !== req.user.id) {
                return res.status(403).send({ message: 'You are not authorized to delete this caption' })
            }
            // delete caption
            await caption.destroy();
            return res.status(204).send();
        } catch(error) {
            return res.status(400).send(error);
        }
    }
}

