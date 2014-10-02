var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:id', function(req, res) {
	db.viaje.findById(req.params.id).populate('Funcionario_id').exec(function (err, viajedate){
	  	if (err) res.render('error', {
	        message: err.message,
	        error: {}});
	  	else {
	  		var link = "http://localhost:3000/profile/" + viajedate._id
	  		res.render('profile',{viajedate:viajedate, link:link});
	  	}
	});
});

module.exports = router;