var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:consecutivo', function(req, res) {
	db.viaje.findOne({Consecutivo :req.params.consecutivo}).populate('Funcionario_id').exec(function (err, viajedate){
	  	if (err) res.render('error', {
	        message: err.message,
	        error: {}});
	  	else {
	  		var link = {
	  			url: "http://checktrips.mx/profile/" + viajedate.Consecutivo,
	  			id : req.params.consecutivo,
	  			tipo : "Viaje",
	  			nombre : viajedate.Consecutivo
	  		}
	  		res.render('profile',{viajedate:viajedate, link:link});
	  	}
	});
});

module.exports = router;