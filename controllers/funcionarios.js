var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	db.funcionario.find(function (err, Funcionario){
		if (err) res.send(500, err.message);
		res.status(200).jsonp(Funcionario);
	});
});

module.exports = router;
