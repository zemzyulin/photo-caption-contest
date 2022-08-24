var express = require('express');
var router = express.Router();

const controller = require('../controllers/photos');

// get all photos
router.get('/', controller.list);
// post new photo
router.post('/', controller.add);
// get photo by id
router.get('/:id', controller.getById);
// put photo by id
router.put('/:id', controller.updateById);
// delete photo by id
router.delete('/:id', controller.deleteById);

module.exports = router;
