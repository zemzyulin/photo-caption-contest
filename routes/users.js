var express = require('express');
var router = express.Router();

const controller = require('../controllers/users');
const auth = require('../middleware/auth');

// get all users
router.get('/', controller.list);
// post new user
router.post('/', controller.add);
// get user by id
router.get('/:id', controller.getById);
// put user by id
router.put('/:id', auth, controller.updateById);
// delete user by id
router.delete('/:id', auth, controller.deleteById);
// login user
router.post('/login', controller.login);

module.exports = router;
