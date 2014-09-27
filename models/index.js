if (!global.hasOwnProperty('db')) {

  var mongoose = require('mongoose');
  mongoose.connect('mongodb://localhost/CheckTrip',function(err, res) {
  	if(err) throw err;
  	console.log('Conectado a BD CheckTrip');
  });
 
  global.db = {
    mongoose: mongoose,
    //models
    funcionario: require('./modelFuncionario')(mongoose),
    // agregar más modelos aquí en caso de haberlos
  };
 
}
 
module.exports = global.db;