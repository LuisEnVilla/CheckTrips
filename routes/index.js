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
	Viaje por id
	Retorna toa la información del viaje indicado mediante id, incluye datos del funcionario (id, Nombre y Trabajo),
	con una petición get. chektrips.mx/viajes/[_id viaje]
	JSON ejemplo:
	viaje : {
		"_id":"54264475f1e8c5127ca5e9b6",
		"Funcionario_id":{
			"_id":"54261c6ef1e8c5112edf7441",
			"Trabajo":{
				"Cargo":"Subdirección de OSOS",
				"CargoSuperior":" Dirección de Relaciones Interinstitucionales y Públicas",
				"Institucion":"INSTITUTO FEDERAL DE ACCESO A LA INFORMACIÓN Y PROTECCIÓN DE DATOS ORGANISMO AUTÓNOMO en proceso de reestructuración",
				"Puesto":"SUBDIRECTOR DE AREA",
				"Clave":"NC3",
				"UnidadAdministrativa":"DIRECCIÓN GENERAL DE CAPACITACIÓN  PROMOCIÓN Y RELACIONES INSTITUCIONALES"
			},
			"Nombre":{
				"Nombres":"Mario Ernesto",
				"ApellidoP":"Mejía",
				"ApellidoM":"Pachón"
			}
		},
		"Resultado":"Se renovaron los coordinadores de la Región Norte de la COMAIP",
		"Tipo":"Nacional",
		"GastoPasaje":6444,
		"Actividad":"Se participo en la Reunión de la Región Norte de la COMAIP; Reunión de la Gestión Documental; Tecnologías de la Información y Gobierno Abierto de la COMAIP",
		"CostoHospedaje":2040,
		"TipoRepresentacion":"Técnico",
		"Tema":"VINCLACION CON ESTADOS Y MUNICIPIOS",
		"FechaInicio":"31/01/2013",
		"Consecutivo":"2013.N.0006",
		"TarifaDiaria":1250,
		"Acuerdo":"No disponible",
		"MecanismoOrigen":"Requerimiento de UR",
		"Antecedentes":"No disponible",
		"ViaticosComp":2500,
		"FechaFin":"02/02/2013",
		"TipoComision":"Participación en evento público",
		"Oficio":"IFAI/SG/DGCPRI/045/2013",
		"Observaciones":"No aplica",
		"GastosViaticos":2500,
		"MotivoComision":"...",
		"UnidadResponsable":"No disponible",
		"InstitutoGenera":"DIRECCIÓN GENERAL DE CAPACITACIÓN; PROMOCIÓN Y RELACIONES INSTITUCIONALES",
		"Moneda":"MXP",
		"Contribucion":"Se cumplió con las atribuciones del IFAI.",
		"URLComunicado":"No disponible",
		"Aclaraciones":4,
		"Vistas":0,
		"GastoTotal":10984,
		"Ranking":9,
		"Pasaje":{
			"LineaOrigen":"Aeroméxico",
			"LineaRegreso":"Aeroméxico",
			"VueloOrigen":"AM 170",
			"TipoPasaje":"Aéreo",
			"CubrePasaje":"IFAI",
			"VueloRegreso":"AM 177"
		},
		"DatosEvento":{
			"URL":"No disponible",
			"Nombre":"REUNION DE LA REGION NORTE DE LA COMAIP; REUNION DE LA COMISION DE GESTION DOCUMENTAL; TECNOLOGIAS DE LA INFORMACION Y GOBIERNO ABIERTO DE LA COMAIP Y EN EL PRIMER FORO NACIONAL DE ANALISIS Y REFLEXION SOBRE LA REFORMA CONSTITUCIONAL EN MATERIA DE TRANSPARENCIA Y ACCESO A LA INFORMACION PUBLICA EN MEXICO",
			"FechaFinPart":"02/02/2013",
			"FechaInicioPart":"31/01/2013"
		},
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
		},
		"Hospedaje":{
			"FechaEntrada":"31/01/2013",
			"NombreHotel":"Grand Hotel Tijuana",
			"CubreHospedaje":"IFAI",
			"FechaSalida":"02/02/2013"
		}
	}
*/
router.get('/viajes/:id',(function(req,res){
	db.viaje.findById(req.params.id)
	.populate({ path: 'Funcionario_id', select: 'Nombre Trabajo' }).exec(function (err, viaje){
			if (err) res.send(500, err.message);
			res.json(viaje);			
		});
}));

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

/*
	Funcionario por id
	Retorna un JSON, todos los datos del funcionario, un arreglo de todos sus viajes realizados 
	y el objeto JSON requerido para graficar con http://www.highcharts.com/demo/combo, que muestra la comparacion de los gastos de los viajes.
	
	JSON ejemplo : 

	{
	  "Funcionario": {
	    "_id": "54261c6ef1e8c5112edf7445",
	    "Correo": "christian.laris@ifai.org.mx",
	    "Aclaraciones": 0,
	    "Vistas": 0,
	    "Viajes": [
	      "54264475f1e8c5127ca5e9b7",
	      "54264475f1e8c5127ca5e9b8",
	      "542c65cdf1e8c5152dae96f3"
	    ],
	    "Trabajo": {
	      "Cargo": "Direcci\u00f3n de Relaciones Interinstitucionales y P\u00fablicas",
	      "CargoSuperior": " Direcci\u00f3n General de Capacitaci\u00f3n Promoci\u00f3n y Relaciones Institucionales",
	      "Institucion": "INSTITUTO FEDERAL DE ACCESO A LA INFORMACI\u00d3N Y PROTECCI\u00d3N DE DATOS ORGANISMO AUT\u00d3NOMO en proceso de reestructuraci\u00f3n",
	      "Puesto": "DIRECTOR DE AREA",
	      "Clave": "MC2",
	      "UnidadAdministrativa": "Direcci\u00f3n General De Capacitaci\u00f3n  Promoci\u00f3n Y Relaciones Institucionales"
	    },
	    "Nombre": {
	      "Nombres": "Christian",
	      "ApellidoP": "Laris",
	      "ApellidoM": "Cuti\u00f1o"
	    }
	  },
	  "Viajes": [
	    {
	      "_id": "54264475f1e8c5127ca5e9b7",
	      "GastoPasaje": 8031,
	      "CostoHospedaje": 0,
	      "Tema": "POL\u00cdTICAS DE ACCESO A LA INFORMACI\u00d3N",
	      "FechaInicio": "28\/02\/2013",
	      "Consecutivo": "2013.N.0013",
	      "FechaFin": "28\/02\/2013",
	      "GastosViaticos": 625,
	      "GastoTotal": 8656,
	      "Destino": {
	        "Pais": "M\u00e9xico",
	        "Ciudad": "Durango",
	        "Estado": "Durango",
	        "Zona": "No Aplica"
	      }
	    },
	    {
	      "_id": "54264475f1e8c5127ca5e9b8",
	      "GastoPasaje": 750.02,
	      "Tema": "VINCLACION CON ESTADOS Y MUNICIPIOS",
	      "FechaInicio": "21\/02\/2013",
	      "Consecutivo": "2013.N.0011",
	      "FechaFin": "21\/02\/2013",
	      "GastosViaticos": 111.5,
	      "GastoTotal": 861.52,
	      "Destino": {
	        "Pais": "M\u00e9xico",
	        "Ciudad": "Puebla",
	        "Estado": "Puebla",
	        "Zona": "No Aplica"
	      }
	    },
	    {
	      "_id": "542c65cdf1e8c5152dae96f3",
	      "GastoPasaje": 883.94,
	      "CostoHospedaje": 168.97,
	      "Tema": "Vinculaci\u00f3n con Estados y Municipios",
	      "FechaInicio": "08\/04\/2013",
	      "Consecutivo": "2013.N.0024",
	      "FechaFin": "08\/04\/2013",
	      "GastosViaticos": 552.5,
	      "GastoTotal": 1605.41,
	      "Destino": {
	        "Pais": "M\u00e9xico",
	        "Ciudad": "Queretaro",
	        "Estado": "Queretaro",
	        "Zona": "No Aplica"
	      }
	    }
	  ],
	  "grafica": {
	    "title": {
	      "text": "Gastos de viajes"
	    },
	    "xAxis": {
	      "categories": [
	        "28\/02\/2013 - 28\/02\/2013",
	        "21\/02\/2013 - 21\/02\/2013",
	        "08\/04\/2013 - 08\/04\/2013"
	      ]
	    },
	    "labels": {
	      "items": [
	        {
	          "html": "$11122.93",
	          "style": {
	            "left": "100px",
	            "top": "18px",
	            "color": "black"
	          }
	        }
	      ]
	    },
	    "series": [
	      {
	        "type": "column",
	        "name": "Pasaje",
	        "data": [
	          8031,
	          750.02,
	          883.94
	        ],
	        "color": "#b2dfdb"
	      },
	      {
	        "type": "column",
	        "name": "Hospedaje",
	        "data": [
	          0,
	          0,
	          168.97
	        ],
	        "color": "#80cbc4"
	      },
	      {
	        "type": "column",
	        "name": "Viaticos",
	        "data": [
	          625,
	          111.5,
	          552.5
	        ],
	        "color": "#26a69a"
	      },
	      {
	        "type": "spline",
	        "name": "Total por Viaje",
	        "data": [
	          8656,
	          861.52,
	          1605.41
	        ],
	        "marker": {
	          "lineWidth": 3,
	          "lineColor": "#26a69a",
	          "fillColor": "#b2dfdb"
	        }
	      },
	      {
	        "type": "pie",
	        "name": "Gasto total",
	        "data": [
	          {
	            "name": "Pasaje",
	            "y": 9664.96,
	            "color": "#b2dfdb"
	          },
	          {
	            "name": "Hospedaje",
	            "y": 168.97,
	            "color": "#80cbc4"
	          },
	          {
	            "name": "Viaticos",
	            "y": 168.97,
	            "color": "#26a69a"
	          }
	        ],
	        "center": [
	          20,
	          0
	        ],
	        "size": 100,
	        "showInLegend": false,
	        "dataLabels": {
	          "enabled": false
	        }
	      }
	    ]
	  },
	}
*/
router.get('/funcionario/:id',function(req, res){
	db.funcionario.findById(req.params.id).exec(function (err, funcionario){
			if (err) res.send(500, err.message);
			db.viaje.find({Funcionario_id : req.params.id},'_id GastoTotal Consecutivo GastoPasaje CostoHospedaje FechaInicio FechaFin GastosViaticos Tema Destino',
				function (err, viajes){
		  		if (err) res.send(500, err.message);
		  		var categorias = [];
		  		var serie = [{
			  			type : 'column',
			  			name : 'Pasaje',
			  			data :[],
			  			color:'#b2dfdb'
		  			},
		  			{
			  			type :'column',
			  			name : 'Hospedaje',
			  			data : [],
			  			color: '#FFC107'
			  		},
		  			{
		  				type : 'column',
		  				name : 'Viaticos',
		  				data : [],
		  				color : 'rgba(0,0,0,0.6)'
		  			},
		  			{
		  				type : 'spline',
		  				name : 'Total por Viaje',
		  				data : [],
		  				marker: {
			                lineWidth: 2,
			                lineColor: 'orange',
			                fillColor: 'white'
			            }
		  			},
		  			{
		  				type : 'pie',
		  				name : 'Gasto total',
		  				data : [{
		  					name : 'Pasaje',
		  					y : 0,
		  					color: '#03a9f4'
		  				},
		  				{
		  					name : 'Hospedaje',
		  					y : 0,
		  					color: '#FFC107'
		  				},{
		  					name : 'Viaticos',
		  					y : 0,
		  					color: 'rgba(0,0,0,0.6)'
		  				}],
		  				center : [100,80],
		  				size : 100,
		  				showInLegend: false,
			            dataLabels: {
			                enabled: false
			            }
		  			}
		  		];
		  		var suma = 0;
		  		var sumapasaje = 0;
		  		var sumahospedaje = 0;
		  		var sumaviaticos = 0;
		  		for (var x in viajes){
		  			categorias.push(viajes[x].FechaInicio +" - "+viajes[x].FechaFin);
		  			if (!isNaN(viajes[x].GastoPasaje)) {
		  				serie[0].data.push(viajes[x].GastoPasaje);
		  				sumapasaje += viajes[x].GastoPasaje;
		  			}
		  			else serie[0].data.push(0);
		  			if (!isNaN(viajes[x].CostoHospedaje)) {
		  				serie[1].data.push(viajes[x].CostoHospedaje);
		  				sumahospedaje += viajes[x].CostoHospedaje;
		  			}
		  			else serie[1].data.push(0);
		  			if (!isNaN(viajes[x].GastosViaticos)) {
		  				serie[2].data.push(viajes[x].GastosViaticos);
			  			sumaviaticos += viajes[x].GastosViaticos;
		  			}
		  			else serie[2].data.push(0);
		  			serie[3].data.push(serie[0].data[x] + serie[1].data[x] + serie[2].data[x]);
		  			suma += serie[0].data[x] + serie[1].data[x] + serie[2].data[x];

		  		}
		  		serie[4].data[0].y = sumapasaje;
		  		serie[4].data[1].y = sumahospedaje;
		  		serie[4].data[2].y = sumahospedaje;
		  		var highcharts = {
		  			title :{ text : 'Gastos de viajes'},
		  			xAxis: { categories: categorias },
		  			labels: { items: [{ html: '$'+suma ,style: { left: '50px',top: '18px', color: 'black'}}]},
		  			series: serie
		  		};
		  		var grafica = {
		  			title :{ text : 'Gastos de viajes'},
		  			xAxis: { categories: categorias },
		  			labels: { items: [{ html: highcharts.labels.items[0].html ,style: { left: '100px',top: '18px', color: 'black'}}]},
		  			series: [{
		  				type : 'column',
		  				name : 'Pasaje',
		  				data :serie[0].data,
		  				color:'#b2dfdb'},
		  				{type :'column',
		  				name : 'Hospedaje',
		  				data : serie[1].data,
		  				color: '#80cbc4'},
		  				{type : 'column',
		  				name : 'Viaticos',
		  				data : serie[2].data,
		  				color : '#26a69a'},
		  				{type : 'spline',
		  				name : 'Total por Viaje',
		  				data : serie[3].data,
		  				marker: {lineWidth: 3,lineColor: '#26a69a',fillColor: '#b2dfdb'}},
		  				{type : 'pie',
		  				name : 'Gasto total',
		  				data : [{
		  					name : 'Pasaje',y : 
		  					serie[4].data[0].y,
		  					color: '#b2dfdb'},
		  					{name : 'Hospedaje',y : 
		  					serie[4].data[1].y,
		  					color: '#80cbc4'},
		  					{name : 'Viaticos',
		  					y : serie[4].data[2].y,
		  					color: '#26a69a'}],
		  					center : [20,0],size : 100,showInLegend: false,dataLabels: {enabled: false}}]};
		  		var link = {
		  			url : "http://checktrips.mx/Funcionarios/" + req.params.id,
		  			id : req.params.id,
		  			tipo : "Funcionario",
		  			nombre : funcionario.Nombre.Nombres +" "+ funcionario.Nombre.ApellidoP
		  		}
				res.json({Funcionario : funcionario, Viajes:viajes, grafica:grafica, link:link});			
				}
			);
	});
});

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

//insertar Funcionario
router.post('/funcionario',function(req, res){
	var funcionario = new db.funcionario ({
		Correo: req.body.correo,
		Nombre: { 
			Nombres : req.body.Nombres,
			ApellidoP : req.body.ApellidoP,
			ApellidoM : req.body.ApellidoM
		 },
		Trabajo: {
			Cargo : req.body.Cargo,
			CargoSuperior : req.body.CargoSuperior,
			Institucion : req.body.Institucion,
			Puesto : req.body.Puesto,
			Clave : req.body.Clave,
			UnidadAdministrativa : req.body.UnidadAdministrativa,
		},
		Aclaraciones : 0,
		Viajes : [],
		Vistas : 0
	});
	funcionario.save(function(err, fun) {
        if(err) return res.send(500, err.message);
    	res.status(200).jsonp(fun);
    });
});
/*
 Aclaraciones
 Incrementa el numero de aclaraciones solicitadas en uno.
*/
router.get('/aclaraciones/:coleccion/:id',function(req, res){
	if (res.params.coleccion === 'viajes'){
		db.viaje.update({_id: req.params.id},{$inc:{Aclaraciones:1}}).exec(function (err, viaje){
			if(err) return res.send(500, err.message);
			else res.status(200);
		});
	}
	else{
		db.funcionario.update({_id: req.params.id},{$inc:{Aclaraciones:1}}).exec(function (err, fun){
			if(err) return res.send(500, err.message);
			else res.status(200);
		});
	}
});

/*
Seguir
En caso de no tener datos del usuario que quiere seguir a un funcionario o viaje,
se agrega, de lo contrario se agrega a su lista de seguidos.

Simpre envia una notificación de que ha sido agragada, como usuario o solo a sus seguidores.
*/
router.post('/seguir',function(req, res){
	db.users.find({$or:[{PhoneNumber:req.body.telefono},{Email: req.body.email}]}).count(function (err, count){
		if (count != 0 ){
			if (req.body.tipo == "Funcionario"){
				db.users.findOneAndUpdate({$or:[{PhoneNumber:req.body.telefono},{Email: req.body.email}]},{$addToSet : {FuncionariosSeguidos :req.body.id }});
				var mensajes = new db.mensaje({
						Destino : req.body.telefono,
    					Mensaje : "Hola "+ req.body.nombre +", Se ha agregado a tu lista de "+req.body.tipo+"s que sigues a "+req.body.nombreSolicitud+".",
					});
				mensajes.save();
				res.status(200);
			}
			else{
				db.users.findOneAndUpdate({$or:[{PhoneNumber:req.body.telefono},{Email: req.body.email}]},{$addToSet : {ViajeSeguidos :req.body.id }});
				var mensajes = new db.mensaje({
						Destino : req.body.telefono,
    					Mensaje : "Hola "+ req.body.nombre +", Se ha agregado a tu lista de "+req.body.tipo+"s que sigues a "+req.body.nombreSolicitud+".",
					});
				mensajes.save();
				res.status(200);
			}
		}
		else{
				if (req.body.tipo == "Funcionario"){
					var user = new db.users({
						PhoneNumber : req.body.telefono,
					    Name : req.body.nombre,
					    Email : req.body.email,
					    FuncionariosSeguidos : [req.body.id],
					    ViajeSeguidos : []
					});
					user.save();
					var mensajes = new db.mensaje({
						Destino : req.body.telefono,
    					Mensaje : "Hola "+ req.body.nombre +", bienvenido a CheckTrips, la plataforma para seguir, registrar y aclarar los viajes de funcionarios públicos del ifai. Acabas de registrar tu numero desde checktrips.mx, ahora podrás recibir las notificaciones correspondientes al funcionario "+req.body.nombreSolicitud+" , además de las aclaraciones que dicho funcionario proporcione.",
					});
					mensajes.save();
					res.status(200);
					
				}
				else{
					var user = new db.users({
						PhoneNumber : req.body.telefono,
					    Name : req.body.nombre,
					    Email : req.body.email,
					    FuncionariosSeguidos : [],
					    ViajeSeguidos : [req.body.id]
					});
					user.save();
					var mensajes = new db.mensaje({
						Destino : req.body.telefono,
    					Mensaje : "Hola "+ req.body.nombre +", bienvenido a CheckTrips, la plataforma para seguir, registrar y aclarar los viajes de funcionarios públicos del ifai. Acabas de registrar tu numero desde checktrips.smx, ahora podrás recibir las notificaciones correspondientes al viaje con el numero de comision "+req.body.nombreSolicitud+" , además de las aclaraciones correspondientes de dicho viaje.",
					});
					mensajes.save();
					res.status(200);
				}
			}
	});
});


//Comparar
router.get('/comparar/:id/:id2/:tipo', function(req, res) {
	if (req.params.tipo == "funcionarios"){
		db.viaje.find({Funcionario_id: req.params.id}).count(function (err, count1){
			  	if (err) res.send(500, err.message);
			  	db.viaje.find({Funcionario_id: req.params.id},"GastoPasaje CostoHospedaje GastosViaticos Aclaraciones TarifaDiaria Moneda FechaFin FechaInicio Destino Funcionario_id").populate('Funcionario_id').exec(function (err, datos1){
					db.viaje.find({Funcionario_id: req.params.id2}).count(function (err, count2){
						if (err) res.send(500, err.message);
						db.viaje.find({Funcionario_id: req.params.id2},"GastoPasaje CostoHospedaje GastosViaticos Aclaraciones TarifaDiaria Moneda FechaFin FechaInicio Destino Funcionario_id").populate('Funcionario_id').exec(function (err, datos2){  	
						  	if(err) return res.send(500, err.message);
						  	var totalpasajes1 = 0
							var totalviaticos1 = 0
							var toatlhospedaje1 = 0
							var totalpasajes2 = 0
							var totalviaticos2 = 0
							var toatlhospedaje2 = 0
							for (x in datos1){
								if (!isNaN(datos1[x].GastoPasaje)) totalpasajes1 += datos1[x].GastoPasaje
								if (!isNaN(datos1[x].GastosViaticos)) totalviaticos1 += datos1[x].GastosViaticos
								if (!isNaN(datos1[x].CostoHospedaje)) toatlhospedaje1 += datos1[x].CostoHospedaje
							}
							for (x in datos2){
								if (!isNaN(datos2[x].GastoPasaje)) totalpasajes2 += datos2[x].GastoPasaje
								if (!isNaN(datos2[x].GastosViaticos)) totalviaticos2 += datos2[x].GastosViaticos
								if (!isNaN(datos2[x].CostoHospedaje)) toatlhospedaje2 += datos2[x].CostoHospedaje
							}
							var total1 = toatlhospedaje1 + totalviaticos1 + totalpasajes1;
							var total2 = toatlhospedaje2 + totalviaticos2 + totalpasajes2;
							var totales ={
									totalpasajes1 : totalpasajes1,
									totalviaticos1 : totalviaticos1,
									toatlhospedaje1 : toatlhospedaje1,
									total1 : total1,
									totalpasajes2 : totalpasajes2,
									totalviaticos2 : totalviaticos2,
									toatlhospedaje2 : toatlhospedaje2,
									total2 : total2
								};
							var grafica1 = {
								 chart: { 
								 	plotBackgroundColor: null, 
								 	plotBorderWidth: 0, 
								 	plotShadow: false }, 
								 title: { 
								 	text: "Total de Gastos $ "+(total1+total2), 
								 	align: 'center', 
								 	verticalAlign: 'top', 
								 	y: 50 },
								 subtitle: {
								 	text: 'Fuente IFAI'}, 
								 tooltip: { 
								 	pointFormat: '{series.name}:{point.percentage:.1f}%' }, 
								 plotOptions: { 
								 	pie: { 
								 		dataLabels: {
								 		 enabled: true, 
								 		 distance: -50, 
								 		 style: { 
								 		 	color: 'white', 
								 		 	textShadow: '0px 1px 2px black' } 
								 		 }, 
								 		startAngle: -90, 
								 		endAngle: 90,
								 		center: ['50%', '75%']}},
								 		series: [{
								 			type: 'pie',
								 			name: 'Porcentaje',
								 			innerSize: '50%',
								 			data: [{
								 				name: datos1[0].Funcionario_id.Nombre.Nombres+"<br>"+" $"+total1,
								 				y: total1,
								 				color: '#80cbc4'},
								 				{name: datos2[0].Funcionario_id.Nombre.Nombres+"<br>"+" $"+total2,
								 				y: total2, 
								 				color:'#4db6ac'
								 			}
								 			]
								 		}
								 		]
								 	};
								var grafica12 = { 
									chart: { 
										plotBackgroundColor: null, 
										plotBorderWidth: 0, 
										plotShadow: false }, 
									title: { 
										text: "Total de Viajes "+(count1+count2), 
										align: 'center', 
										verticalAlign: 'top', y: 50 },
									subtitle: {
										text: 'Fuente IFAI'}, 
										tooltip: { 
											pointFormat: '{series.name}:{point.percentage:.1f}%' }, 
											plotOptions: { pie: { dataLabels: { enabled: true, distance: -50, 
											style: { color: 'white', textShadow: '0px 1px 2px black' } }, 
											startAngle: -90, endAngle: 90,center: ['50%', '75%']}},
									series: [{
										type: 'pie',
										name: 'Viajes',
										innerSize: '50%',
										data: [
											{
												name: datos1[0].Funcionario_id.Nombre.Nombres+" "+count1,
												y: count1,color: '#80cbc4'},
											{
												name: datos2[0].Funcionario_id.Nombre.Nombres+" "+count2,
												y: count2, color : '#4db6ac'}]}]
											};
								var grafica2 = {
									chart: {
										type: 'bar'},
										title: {
											text: 'Gastos por seccion'
										},
										subtitle: {
											text: 'Fuente IFAI'
										},
										xAxis: {
											categories: [datos1[0].Funcionario_id.Nombre.Nombres, datos2[0].Funcionario_id.Nombre.Nombres],
											title: {
												text: null
											}
										},
										yAxis: {
											min: 0,
											title: {
												text: 'Pesos MXP',
												align: 'high'
											},
											labels: {
												overflow: 'justify'}
											},
											tooltip: {
												valueSuffix: ' Pesos'
											},
											plotOptions: {
												bar: {
													dataLabels: {
														enabled: true}
													}
												},
												legend: {
													layout: 'vertical',
													align: 'right',
													verticalAlign: 'top',
													x: -40,
													y: 10,
													floating: true,
													borderWidth: 1,
													backgroundColor:  '#FFFFFF',
													shadow: true
												},
												credits: {
													enabled: false
												},
												series: [{
													name: 'Gastos en Hospedaje',
													color: '#b2dfdb',
													data: [toatlhospedaje1 , toatlhospedaje2]
													}, {
													name: 'Gastos en Viaticos',
													color:'#80cbc4',
													data: [totalviaticos1 , totalviaticos2]
													}, {
													name: 'Gastos en Pasaje',
													color: '#26a69a',
													data: [totalpasajes1 , totalpasajes2]
													}]
												};
						  		var link = {
						  			url:"http://checktrips.mx/compare/" + req.params.id +"/"+req.params.id2 + "/"+req.params.tipo
						  		}
						  		res.json({count1:count1, count2:count2, datos1:datos1,datos2:datos2, totales:totales,grafica1:grafica1,grafica2:grafica2,grafica12:grafica12, tipo:1,link:link});
						});
					});
			  });
		});
	}
	else if (req.params.tipo == "viaje"){
	  	db.viaje.find({Consecutivo : req.params.id},"ViaticosComp ViaticosNoComp ViaticosDevueltos Tema MecanismoOrigen TarifaDiaria Consecutivo GastoPasaje CostoHospedaje GastosViaticos Aclaraciones  Moneda FechaFin FechaInicio Destino Funcionario_id").populate('Funcionario_id').exec(function (err, datos1){
			db.viaje.find({Consecutivo: req.params.id2},"ViaticosComp ViaticosNoComp ViaticosDevueltos Tema MecanismoOrigen TarifaDiaria Consecutivo GastoPasaje CostoHospedaje GastosViaticos Aclaraciones  Moneda FechaFin FechaInicio Destino Funcionario_id").populate('Funcionario_id').exec(function (err, datos2){  	
			  	if(err) return res.send(500, err.message);
			  	var totalpasajes1 = 0
				var totalviaticos1 = 0
				var toatlhospedaje1 = 0
				var totalpasajes2 = 0
				var totalviaticos2 = 0
				var toatlhospedaje2 = 0
				for (x in datos1){
					if (!isNaN(datos1[x].GastoPasaje)) totalpasajes1 += datos1[x].GastoPasaje
					if (!isNaN(datos1[x].GastosViaticos)) totalviaticos1 += datos1[x].GastosViaticos
					if (!isNaN(datos1[x].CostoHospedaje)) toatlhospedaje1 += datos1[x].CostoHospedaje
				}
				for (x in datos2){
					if (!isNaN(datos2[x].GastoPasaje)) totalpasajes2 += datos2[x].GastoPasaje
					if (!isNaN(datos2[x].GastosViaticos)) totalviaticos2 += datos2[x].GastosViaticos
					if (!isNaN(datos2[x].CostoHospedaje)) toatlhospedaje2 += datos2[x].CostoHospedaje
				}
				var total1 = toatlhospedaje1 + totalviaticos1 + totalpasajes1
				var total2 = toatlhospedaje2 + totalviaticos2 + totalpasajes2
				var totales ={
					totalpasajes1 : totalpasajes1,
					totalviaticos1 : totalviaticos1,
					toatlhospedaje1 : toatlhospedaje1,
					total1 : total1,
					totalpasajes2 : totalpasajes2,
					totalviaticos2 : totalviaticos2,
					toatlhospedaje2 : toatlhospedaje2,
					total2 : total2
				}
					var grafica1 = { 
						chart: { 
							plotBackgroundColor: null, 
							plotBorderWidth: 0, 
							plotShadow: false }, 
							title: { 
								text: "Total de Gastos $ "+(total1+total2), 
								align: 'center', 
								verticalAlign: 'top', y: 50 
							},
							subtitle: {
								text: 'Fuente IFAI'
							}, 
							tooltip: { 
								pointFormat: '{series.name}:{point.percentage:.1f}%' 
							}, 
							plotOptions: { 
								pie: { 
									dataLabels: { 
										enabled: true, 
										distance: -50, 
										style: { 
											color: 'white', 
											textShadow: '0px 1px 2px black' 
										} 
									}, 
									startAngle: -90, 
									endAngle: 90,
									center: ['50%', '75%']
								}
							},
							series: [{
								type: 'pie',
								name: '$',
								innerSize: '50%',
								data: [{
									name: datos1[0].Consecutivo+" <br>$"+total1,
									y: total1,
									color: '#80cbc4'
								},{
									name: datos2[0].Consecutivo+" <br>$"+total2,
									y: total2,
									color: '#4db6ac'
								}]
							}
							]
						};
					var grafica12 = { 
						chart: { 
							plotBackgroundColor: null, 
							plotBorderWidth: 0, 
							plotShadow: false 
						}, 
						title: { 
							text: 'Total Aclaraciones Solicitadas', 
							align: 'center', 
							verticalAlign: 'top', 
							y: 50 
						},
						subtitle: {
							text: 'Fuente IFAI'
						}, 
						tooltip: { 
							pointFormat: '{series.name}:{point.percentage:.1f}%' }, 
							plotOptions: { 
								pie: { 
									dataLabels: { 
										enabled: true, 
										distance: -50, 
										style: { 
											color: 'white', 
											textShadow: '0px 1px 2px black' 
										} 
									}, 
									startAngle: -90, 
									endAngle: 90,
									center: ['50%', '75%']
								}
							},
						series: [{
							type: 'pie',
							name: '$',
							innerSize: '50%',
							data: [{
								name: datos1[0].Consecutivo+" "+datos1[0].Aclaraciones,
								y: datos1[0].Aclaraciones,
								color: '#80cbc4'
							},{
								name: datos2[0].Consecutivo+" "+datos2[0].Aclaraciones,
								y: datos2[0].Aclaraciones,
								color: '#4db6ac'
							}]
						}]
					};
					var grafica2 = {
						chart: {
							type: 'bar'},
							title: {
								text: 'Gastos por seccion'
							},
							subtitle: {
								text: 'Fuente IFAI'
							},
							xAxis: {
								categories: [datos1[0].Consecutivo, datos2[0].Consecutivo],
								title: {
									text: null
								}
							},
							yAxis: {
								min: 0,
								title: {
									text: 'Pesos MXP',
									align: 'high'
								},
								labels: {
									overflow: 'justify'
								}
							},
							tooltip: {
								valueSuffix: ' Pesos'
							},
							plotOptions: {
								bar: {
									dataLabels: {
										enabled: true
									}
								}
							},
							legend: {
								layout: 'vertical',
								align: 'right',
								verticalAlign: 'top',
								x: -40,
								y: 10,
								floating: true,
								borderWidth: 1,
								backgroundColor:  '#FFFFFF',
								shadow: true
							},
							credits: {
								enabled: false
							},
							series: [{
								name: 'Gastos en Hospedaje',
								color: '#b2dfdb',
								data: [toatlhospedaje1, toatlhospedaje2]
								}, {
								name: 'Gastos en Viaticos',
								color:'#80cbc4',
								data: [totalviaticos1, totalviaticos2]
								}, {
								name: 'Gastos en Pasaje',
								color: '#26a69a',
								data: [totalpasajes1, totalpasajes2]
							}
							]
						};
					var link = {
						url: "http://checktrips.mx/compare/" + req.params.id +"/"+req.params.id2 + "/"+req.params.tipo
					}
					res.json({datos1:datos1,datos2:datos2, totales:totales,grafica1:grafica1,grafica2:grafica2,grafica12:grafica12, tipo:0,link:link});
			});
		});
	}
	else{
		return res.send(404, err.message);
	}
});

/* GET home page. */
//router.get('*', function(req, res) {
//	res.sendfile('./public/index.html');
//});


module.exports = router;