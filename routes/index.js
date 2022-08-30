const express = require('express');
const router = express.Router();

// Setting up swagger documentation
const fs = require('fs');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../docs/api-docs.json');
const customCss = fs.readFileSync((process.cwd()+'/docs/swagger.css'), 'utf8');
router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {customCss}));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
