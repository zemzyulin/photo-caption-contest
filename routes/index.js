var express = require('express');
var router = express.Router();

const userController = require('../controllers/users');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
// login user
router.post('/login', userController.login);

module.exports = router;
