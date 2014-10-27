var express = require('express');
var router = express.Router();

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

/* GET home page. */
router.get('/:id', function(req, res) {
	db.funcionario.findById(req.params.id).exec(function (err, Funcionario){
	  	if (err) res.render('error', {
	        message: err.message,
	        error: {}});
	  	db.viaje.find({Funcionario_id : req.params.id},'_id Consecutivo GastoPasaje CostoHospedaje FechaInicio FechaFin GastosViaticos Tema Destino',function (err, viajes){
	  		if (err) res.render('error', {
	        message: err.message,
	        error: {}});
	  		var categorias = [];
	  		var serie = [{
		  			type : 'column',
		  			name : 'Pasaje',
		  			data :[],
		  			color:'#03a9f4'
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
	  			categorias.push("'"+viajes[x].FechaInicio +" - "+viajes[x].FechaFin+"'");
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
	  		var grafica = "{title :{ text : 'Gastos de viajes'},xAxis: { categories: ["+categorias.toString()+"] },labels: { items: [{ html: '"+highcharts.labels.items[0].html+"' ,style: { left: '100px',top: '18px', color: 'black'}}]},series: [{type : 'column',name : 'Pasaje',data :["+serie[0].data.toString()+"],color:'#b2dfdb'},{type :'column',name : 'Hospedaje',data : ["+serie[1].data.toString()+"],color: '#80cbc4'},{type : 'column',name : 'Viaticos',data : ["+serie[2].data.toString()+"],color : '#26a69a'},{type : 'spline',name : 'Total por Viaje',data : ["+serie[3].data.toString()+"],marker: {lineWidth: 3,lineColor: '#26a69a',fillColor: '#b2dfdb'}},{type : 'pie',name : 'Gasto total',data : [{name : 'Pasaje',y : "+serie[4].data[0].y.toString()+",color: '#b2dfdb'},{name : 'Hospedaje',y : "+serie[4].data[1].y.toString()+",color: '#80cbc4'},{name : 'Viaticos',y : "+serie[4].data[2].y.toString()+",color: '#26a69a'}],center : [20,0],size : 100,showInLegend: false,dataLabels: {enabled: false}}]}";
	  		var link = {
	  			url : "http://checktrips.jit.su/Funcionarios/" + req.params.id,
	  			id : req.params.id,
	  			tipo : "Funcionario",
	  			nombre : Funcionario.Nombre.Nombres +" "+ Funcionario.Nombre.ApellidoP
	  		}
	  		res.render('funcionarios',{Funcionario:Funcionario,viajes:viajes,grafica:grafica,link:link});
	  	});
	});
});

module.exports = router;
