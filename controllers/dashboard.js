var express = require('express');
var router = express.Router();

/*
	Viajes del funcionario
	Retorna un arreglo con todos los viajes del funcionario indicado mediante su id, para ser mostrado en tarjetas de viajes
	JSON ejemplo:
	[
	  {
	    "_id": "54264475f1e8c5127ca5e9b7",
	    "Funcionario_id": "54261c6ef1e8c5112edf7445",
	    "GastoPasaje": 8031,
	    "Tema": "POL\u00cdTICAS DE ACCESO A LA INFORMACI\u00d3N",
	    "FechaInicio": "28\/02\/2013",
	    "Consecutivo": "2013.N.0013",
	    "Aclaraciones": 1,
	    "Vistas": 0,
	    "GastoTotal": 8656,
	    "Ranking": 11,
	    "Destino": {
	      "Pais": "M\u00e9xico",
	      "Ciudad": "Durango",
	      "Estado": "Durango",
	      "Zona": "No Aplica"
	    },
	    "Origen": {
	      "Pais": "M\u00e9xico",
	      "Ciudad": "Ciudad de M\u00e9xico",
	      "Estado": "Distrito Federal"
	    }
	  },
	  ...
	 ]
*/
router.get('/funcionario/viajes/:id',function(req, res){
	db.viaje.find({Funcionario_id : req.params.id},' Vistas Ranking GastoTotal Consecutivo Aclaraciones _id Tema  GastoPasaje FechaInicio Origen Destino Funcionario_id',
		function (err, viajes){
		if (err) res.send(500, err.message);
		res.json(viajes)
	});
});


router.get('/viajes', function(req, res) {
	res.sendfile('./public/dashViajes.html');
});

router.get('/pendientes', function(req, res) {
	res.sendfile('./public/dashViajesPendientes.html');
});

router.get('/funcionario/pendientes/:id',function(req, res){
	db.viajePendiente.find({Funcionario_id : req.params.id},' Vistas Ranking GastoTotal Consecutivo Aclaraciones _id Tema  GastoPasaje FechaInicio Origen Destino Funcionario_id',
		function (err, viajes){
		if (err) res.send(500, err.message);
		res.json(viajes)
	});
});


//Actualizar Funcionario
router.put('/funcionario/:id',function(req, res){
	db.funcionario.findById(req.params.id).exec(function (err, funcionario){
			if (err) res.send(500, err.message);
			else{
				funcionario.correo = req.body.email;
				funcionario.Nombre.Nombres = req.body.nombre;
				funcionario.Nombre.ApellidoP = req.body.apellidoPaterno;
				funcionario.Nombre.ApellidoM = req.body.apellidoMaterno;
				funcionario.Trabajo.Cargo = req.body.cargo;
				funcionario.Trabajo.CargoSuperior = req.body.cargoSuperior;
				funcionario.Tabajo.Institucion = req.body.institucion;
				funcionario.Tabajo.Puesto = req.body.puesto;
				funcionario.Tabajo.Clave = req.body.clave;
				funcionario.Tabajo.UnidadAdministrativa = req.body.unidadAdministrativa;
				funcionario.save(function(err, funcionario) {
			        if(err) return res.send(500, err.message);
			    	res.status(200).jsonp(funcionario);
			    });
			}
		}
	);
});


module.exports = router;