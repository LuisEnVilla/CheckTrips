var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:dato1', function(req, res) {
	var tipo = req.params.dato1;
	//var dato2 = req.params.dato2;
	if (tipo == "Top" || tipo == "top"){
		db.viaje.find({FechaInicio:{$regex:"08/"}}
		,'_id Tema Tipo GastoPasaje FechaInicio Origen Destino Funcionario_id')
		.limit(3).populate('Funcionario_id').exec(function (err, fecha){
			if (err) res.send(500, err.message);
			db.viaje.find({GastoPasaje : {$gt:8000}},'_id Tema CostoHospedaje GastosViaticos Tipo GastoPasaje Origen Destino Funcionario_id').limit(3).populate('Funcionario_id').exec(function (err, viajes){
				if (err) res.send(500, err.message);
				db.viaje.find({GastosViaticos : {$gt:8000}},'_id Tema CostoHospedaje GastosViaticos Tipo GastoPasaje Origen Destino Funcionario_id').limit(3).populate('Funcionario_id').exec(function (err, viajes2){
					if (err) res.send(500, err.message);
					db.unidad.find({CounViajes : {$gt:1}},'_id Nombre CounViajes CountFuncionarios').exec(function (err, unidades){
						if (err) res.send(500, err.message);
						res.send({Recientes:fecha,GastoPasaje:viajes,GastosViaticos:viajes2,Unidades:unidades});
					});
				});
			});
		});
	}
	else if(tipo == viaje){
		var criterio = req.params.dato2;
		var limite = req.params.dato4;
		if (criterio == "consecutivo" || criterio == "Consecutivo"){
			var consecutivo = req.params.dato5;
			s = db.viaje.find({Consecutivo: {$regex :consecutivo}}).limit(limite).populate();
			res.send(s);
		}
	}
});

module.exports = router;