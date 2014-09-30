module.exports = function(mongoose) {
  var Schema = mongoose.Schema;
  // Objeto modelo de Mongoose
  var SchemaAclaracion = new Schema({
    // Propiedades
    _id : Schema.Types.ObjectId,
    Contador : Number,
    Reclamado_id : {type : Schema.Types.ObjectId , ref : 'Funcionario'},
    Usuario : {type : Schema.Types.ObjectId , ref : 'Usuario'}
  });
  SchemaAclaracion.set('collection','Aclaracion');
  return mongoose.model('Aclaracion', SchemaAclaracion);
}