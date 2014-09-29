var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:id', function(req, res) {
	db.funcionario.findById(req.params.id).exec(function (err, Funcionario){
	  	if (err) res.render('error', {
	        message: err.message,
	        error: {}});
	  	db.viaje.count({Funcionario_id: req.params.id},function (err, contador){
	  		if (err) res.render('error', {
	        message: err.message,
	        error: {}});
	  		else res.render('funcionarios',{Funcionario:Funcionario,contador:contador});
	  	});
	});
});

module.exports = router;
