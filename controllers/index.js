var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

module.exports = router;

/*
exports.index = function(req, res){
  res.render('index')
};

exports.logeo = function (req, res){
	res.render('logeo')
}*/