var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/CheckTrip',function(err, res) {
	if(!err) console.log('Conectado a BD CheckTrip');
});

global.db = {
mongoose: mongoose,
//models
funcionario: require('./Funcionario')(mongoose),
viaje : require('./modelViaje')(mongoose)
// agregar más modelos aquí en caso de haberlos
};
module.exports = global.db;