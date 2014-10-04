var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:dato1/:dato2/:dato3', function(req, res) {
	var tipo = req.params.dato1;
	var criterio = req.params.dato2;
	var limite = req.params.dato3;
	if (tipo == "Top" || tipo == "top"){
		db.viaje.find({FechaInicio:{$regex:"08/"}}
		,'Consecutivo Aclaraciones _id Tema Tipo GastoPasaje FechaInicio Origen Destino Funcionario_id')
		.limit(3).populate('Funcionario_id').exec(function (err, fecha){
			if (err) res.send(500, err.message);
			db.viaje.find({$or:[{GastoPasaje:{$type:16}},{GastoPasaje:{$type:18}},{GastoPasaje:{$type:1}}]},'Consecutivo Aclaraciones _id Tema CostoHospedaje GastosViaticos Tipo GastoPasaje Origen Destino Funcionario_id').populate('Funcionario_id').sort({GastoPasaje : -1}).limit(3).exec(function (err, viajes){
				if (err) res.send(500, err.message);
				db.viaje.find({$or:[{GastosViaticos:{$type:16}},{GastosViaticos:{$type:18}},{GastosViaticos:{$type:1}}]},'Consecutivo Aclaraciones _id Tema CostoHospedaje GastosViaticos Tipo GastoPasaje Origen Destino Funcionario_id').populate('Funcionario_id').sort({GastosViaticos : -1}).limit(3).exec(function (err, viajes2){
					if (err) res.send(500, err.message);
					db.unidad.find({CounViajes : {$gt:1}},'_id Nombre CounViajes CountFuncionarios').exec(function (err, unidades){
						if (err) res.send(500, err.message);
						res.send({Recientes:fecha,GastoPasaje:viajes,GastosViaticos:viajes2,Unidades:unidades});
					});
				});
			});
		});
	}
	else if(tipo == "viaje"){
		if (criterio == "consecutivo" || criterio == "Consecutivo"){
			var consecutivo = limite;
			db.viaje.find({Consecutivo: {$regex :consecutivo}}).populate('Funcionario_id').exec(function (err, viajes){
			res.send(viajes);
			});
		}
		else if (criterio == "byId"){
			var id = limite;
			db.viaje.findById(id).populate('Funcionario_id').exec(function (err, viajes){
			res.send(viajes);
			});
		}
		else if (criterio == "maxPasaje"){
			db.viaje.find({$or:[{GastoPasaje:{$type:16}},{GastoPasaje:{$type:18}},{GastoPasaje:{$type:1}}]}).sort({GastoPasaje : -1}).populate('Funcionario_id').exec(function (err, viajes){
			res.send(viajes);
			});
		}
		else if (criterio == "maxViaticos"){
			db.viaje.find({$or:[{GastosViaticos:{$type:16}},{GastosViaticos:{$type:18}},{GastosViaticos:{$type:1}}]}).sort({GastosViaticos : -1}).populate('Funcionario_id').exec(function (err, viajes){
			res.send(viajes);
			});
		}
		else if (criterio == "maxHospedaje"){
			db.viaje.find({$or:[{CostoHospedaje:{$type:16}},{CostoHospedaje:{$type:18}},{CostoHospedaje:{$type:1}}]}).sort({CostoHospedaje : -1}).populate('Funcionario_id').exec(function (err, viajes){
			res.send(viajes);
			});
		}
		else if (criterio == "all" || criterio == "todos"){
			db.viaje.find().populate('Funcionario_id').exec(function (err, viajes){
			res.send(viajes);
			});
		}
		else if (criterio == "idFuncionario"){
			var funcionario = limite;
			db.viaje.findOne({Funcionario_id:funcionario}).populate('Funcionario_id').exec(function (err, viajes){
			res.send(viajes);
			});
		}
	}
	else if (tipo == "funcionario"){
		if (criterio == "all" || criterio == "todos"){
			db.funcionario.find().exec(function (err, funcionarios){
			res.send(funcionarios);
			});
		}
		else if (criterio == "nombre"){
			var nombre = limite;
			db.funcionario.find({'Nombre.Nombres':{$regex :nombre }}).exec(function (err, funcionarios){
			res.send(funcionarios);
			});
		}
	}
});

module.exports = router;