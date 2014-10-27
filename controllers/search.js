var express = require('express');
var router = express.Router();


/*	Todos los Viajes  
	Retorna un arreglo de viajes en JSON, solo datos usados en las targetas de precentación de viajes.
	Json ejemplo:
	viajes : [
		{
			"_id":"54264475f1e8c5127ca5e9b6",
			"Funcionario_id":{
				"_id":"54261c6ef1e8c5112edf7441",
				"Nombre":{
					"Nombres":"Mario Ernesto",
					"ApellidoP":"Mejía",
					"ApellidoM":"Pachón"
				}
			},
			"GastoPasaje":6444,
			"Tema":"VINCLACION CON ESTADOS Y MUNICIPIOS",
			"FechaInicio":"31/01/2013",
			"Consecutivo":"2013.N.0006",
			"Aclaraciones":4,
			"Vistas":0,
			"GastoTotal":10984,
			"Ranking":9,
			"Destino":{
				"Pais":"México",
				"Ciudad":"Tijuana",
				"Estado":"Baja California",
				"Zona":"No Aplica"
			},
			"Origen":{
				"Pais":"México",
				"Ciudad":"Ciudad de México",
				"Estado":"Distrito Federal"
			}
		},
		...]
*/
router.get('/viajes',function(req, res){
	db.viaje.find({},
		' Vistas Ranking GastoTotal Consecutivo Aclaraciones _id Tema  GastoPasaje FechaInicio Origen Destino Funcionario_id')
		.populate({ path: 'Funcionario_id', select: 'Nombre' }).exec(function (err, viajes){
			if (err) res.send(500, err.message);
			res.jsonp(viajes);			
		});
});

/*
	Todos los funcionarios.
	Regresa un JSON con la información de cada funcionario.
	JSON ejemplo:
	funcionarios : [
	{
		"_id":"54261c6ef1e8c5112edf7381",
		"Correo":"liliana.herrera@ifai.org.mx",
		"Aclaraciones":0,
		"Vistas":0,
		"Viajes":[],
		"Trabajo":{
			"Cargo":"Secretaría Particular",
			"CargoSuperior":"Comisionado",
			"Institucion":"INSTITUTO FEDERAL DE ACCESO A LA INFORMACIÓN Y PROTECCIÓN DE DATOS ORGANISMO AUTÓNOMO en proceso de reestructuración",
			"Puesto":"SECRETARIO PARTICULAR DE PONENCIA",
			"Clave":"MC03",
			"UnidadAdministrativa":"Comisionado"
		},
		"Nombre":{
			"Nombres":"Liliana",
			"ApellidoP":"Herrera",
			"ApellidoM":"Martín"
		}
	},
	...
	]
*/
router.get('/funcionario',function(req, res){
	db.funcionario.find({},function (err, funcionarios){
			if (err) res.send(500, err.message);
			res.json(funcionarios);			
		});
});

router.get('*', function(req, res) {
	res.sendfile('./public/search.html');
});

module.exports = router;