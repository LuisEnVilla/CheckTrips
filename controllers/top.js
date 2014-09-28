var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	//Top viajes mas caros
	db.viaje.find({Moneda:'USD'},'Tipo TarifaDiaria FechaFin Moneda Origen Destino Funcionario_id').limit(3).populate('Funcionario_id').exec(function (err, viajes){
		if (err) res.send(500, err.message);
		//res.status(200).jsonp(viajes);
		else res.render('top',{viajes:viajes});
	});
  //res.render('top');
});

module.exports = router;