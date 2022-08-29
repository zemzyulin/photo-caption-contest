const Photo = require('../models').Photo;
const Caption = require('../models').Caption;

const CashService = require('./cache');
const cache = new CashService(3600);
const KEY = 'photos';

module.exports = {
    async list(req, res) {
        try {
            let photos = await Photo.findAll({
                order: [['createdAt', 'DESC']]
            });
            return res.status(200).send(photos);
        } catch {error} {
            return res.status(400).send(error);
        }
    },
    async add(req, res) {
        try {
            let photo = await Photo.create({
                url: req.body.url,
                description: req.body.description
            })
            return res.status(201).send(photo);
        } catch(error) {
            return res.status(400).send(error);
        }
    },
    async getById(req, res) {
        try {
            let photo = await cache.get(`${KEY}_${req.params.id}`, () => {
                return Photo.findByPk(req.params.id, {
                    include: [{
                        model: Caption,
                        as: 'captions'
                    }]
                })
            })
            if (!photo) {
                return res.status(404).send({ message: 'Photo not found' })
            }
            return res.status(200).send(photo);
        } catch(error) {
            return res.status(400).send(error);
        }
    },
    async updateById(req, res) {
        try {
            let photo = await Photo.findByPk(req.params.id)
            if (!photo) {
                return res.status(404).send({ message: 'Photo not found' })
            }
            await photo.update({
                url: req.body.url || photo.url,
                description: req.body.description || photo.description
            })
            cache.del(`${KEY}_${req.params.id}`);
            return res.status(200).send(photo)
        } catch(error) {
            return res.status(400).send(error);
        }
    },
    async deleteById(req, res) {
        try {
            let photo = await Photo.findByPk(req.params.id);
            if (!photo) {
                return res.status(404).send({ message: 'Photo not found' })
            }
            await photo.destroy();
            cache.del(`${KEY}_${req.params.id}`);
            return res.status(204).send();
        } catch(error) {
            return res.status(400).send(error);
        }
    }
}

