var express = require('express');
var router = express.Router();


router.get('/', function(req, res) {
  res.render('insert');
});

module.exports = router;