var express = require('express');
var router = express.Router();

router.get('/viajes',function(req, res){
	db.viaje.find({},
		' Vistas Ranking GastoTotal Consecutivo Aclaraciones _id Tema  GastoPasaje FechaInicio Origen Destino Funcionario_id')
		.populate('Funcionario_id').exec(function (err, viajes){
			if (err) res.send(500, err.message);
			res.json(viajes);			
		});
});

router.post('/viajes',(function(req,res){
	db.viaje.findById(req.body.id)
	.populate('Funcionario_id').exec(function (err, viaje){
			if (err) res.send(500, err.message);
			res.json(viaje);			
		});
}));

router.get('/funcionario',function(req, res){
	db.funcionario.find({},function (err, funcionarios){
			if (err) res.send(500, err.message);
			res.json(funcionarios);			
		});
});

router.get('/funcionario/:id',function(req, res){
	db.funcionario.findById(req.params.id).exec(function (err, funcionario){
			if (err) res.send(500, err.message);
			db.viaje.find({Funcionario_id : req.params.id},'_id Consecutivo GastoPasaje CostoHospedaje FechaInicio FechaFin GastosViaticos Tema Destino',
				function (err, viajes){
		  		if (err) res.send(500, err.message);
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
	  		var grafica = {
	  			title :{ text : 'Gastos de viajes'},
	  			xAxis: { categories: [categorias.toString()] },
	  			labels: { items: [{ html: highcharts.labels.items[0].html ,style: { left: '100px',top: '18px', color: 'black'}}]},
	  			series: [{
	  				type : 'column',
	  				name : 'Pasaje',
	  				data :[serie[0].data.toString()],
	  				color:'#03a9f4'},
	  				{type :'column',
	  				name : 'Hospedaje',
	  				data : [serie[1].data.toString()],
	  				color: '#FFC107'},
	  				{type : 'column',
	  				name : 'Viaticos',
	  				data : [serie[2].data.toString()],
	  				color : 'rgba(0,0,0,0.6)'},
	  				{type : 'spline',
	  				name : 'Total por Viaje',
	  				data : [serie[3].data.toString()],
	  				marker: {lineWidth: 2,lineColor: 'orange',fillColor: 'white'}},
	  				{type : 'pie',
	  				name : 'Gasto total',
	  				data : [{
	  					name : 'Pasaje',y : 
	  					serie[4].data[0].y.toString(),
	  					color: '#03a9f4'},
	  					{name : 'Hospedaje',y : 
	  					serie[4].data[1].y.toString(),
	  					color: '#FFC107'},
	  					{name : 'Viaticos',
	  					y : serie[4].data[2].y.toString(),
	  					color: 'rgba(0,0,0,0.6)'}],
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

/* GET home page. */
router.get('*', function(req, res) {
	res.sendfile('./public/index.html');
});

module.exports = router;