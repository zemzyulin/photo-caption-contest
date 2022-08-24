var express = require('express');
var router = express.Router();

const controller = require('../controllers/users');

// get all users
router.get('/', controller.list);
// post new user
router.post('/', controller.add);
// get user by id
router.get('/:id', controller.getById);
// put user by id
router.put('/:id', controller.updateById);
// delete user by id
router.delete('/:id', controller.deleteById);

module.exports = router;
