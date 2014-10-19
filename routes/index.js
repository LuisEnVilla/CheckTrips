var express = require('express');
var router = express.Router();

/* GET home page. */
//router.get('*', function(req, res) {
//	res.sendfile('./public/index.html');
//});

router.get('/viajes',function(req, res){
	db.viaje.find({},
		'Consecutivo Aclaraciones _id Tema  GastoPasaje FechaInicio Origen Destino Funcionario_id')
		.populate('Funcionario_id').exec(function (err, viajes){
			if (err) res.send(500, err.message);
			res.json(viajes);			
		});
});

router.post('/viajes',(function(req,res){
	db.viaje.find({Consecutivo: {$regex:req.body.buscar}},'Consecutivo Aclaraciones _id Tema  GastoPasaje FechaInicio Origen Destino Funcionario_id')
	.populate('Funcionario_id').exec(function (err, viajes){
			if (err) res.send(500, err.message);
			res.json(viajes);			
		});
}));

module.exports = router;