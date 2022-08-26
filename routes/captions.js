var express = require('express');
var router = express.Router();

const controller = require('../controllers/captions');
const auth = require('../middleware/auth');

// get all captions
router.get('/', controller.list);
// post new caption
router.post('/', auth, controller.add);
// get caption by id
router.get('/:id', controller.getById);
// put caption by id
router.put('/:id', auth, controller.updateById);
// delete caption by id
router.delete('/:id', auth, controller.deleteById);

module.exports = router;
