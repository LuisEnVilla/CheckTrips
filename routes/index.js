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
router.get('*', function(req, res) {
	res.sendfile('./public/index.html');
});

module.exports = router;