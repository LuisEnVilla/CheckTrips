var mongoose = require('mongoose');
// Descomentar para usar una BD local
//mongoose.connect('mongodb://localhost/CheckTrip',function(err, res) {
mongoose.connect('mongodb://nodejitsu:e64f3734605edb11e40ec425b159ad7c@troup.mongohq.com:10077/nodejitsudb8852955766',function(err, res) {
	if(!err) console.log('Conectado a BD CheckTrip');
});

global.db = {
mongoose: mongoose,
//models
funcionario: require('./Funcionario')(mongoose),
viaje : require('./modelViaje')(mongoose),
unidad : require('./modelUnidad')(mongoose),
aclaracion : require('./modelAclaracion')(mongoose),
users : require('./modelUsers')(mongoose),
mensaje : require('./modelMensaje')(mongoose),
catalogoComision :  require('./catalogoComision')(mongoose),
catalogoTema : require('./CatalogoTema')(mongoose),
catalogoEdos : require('./CatalogoEdos') (mongoose),
viajePendiente : require('./modelViajePendiente') (mongoose)
// agregar más modelos aquí en caso de haberlos
};
module.exports = global.db;