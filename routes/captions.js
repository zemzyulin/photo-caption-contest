var express = require('express');
var router = express.Router();

const controller = require('../controllers/captions');

// get all captions
router.get('/', controller.list);
// post new caption
router.post('/', controller.add);
// get caption by id
router.get('/:id', controller.getById);
// put caption by id
router.put('/:id', controller.updateById);
// delete caption by id
router.delete('/:id', controller.deleteById);

module.exports = router;
