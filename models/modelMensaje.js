module.exports = function(mongoose) {
  var Schema = mongoose.Schema;
  // Objeto modelo de Mongoose
  var SchemaMensaje = new Schema({
    // Propiedades
    _id : Schema.Types.ObjectId,
    Destino : String,
    Mensaje : String,
  });
  SchemaMensaje.set('collection','Mensajes');
  return mongoose.model('Mensajes', SchemaMensaje);
}