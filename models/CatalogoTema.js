module.exports = function(mongoose) {
  var Schema = mongoose.Schema;
  // Objeto modelo de Mongoose
  var SchemaCatalogoTema = new Schema({
    // Propiedades
    _id : Schema.Types.ObjectId,
    Descripcion : String,
    Tema:String
  });
  SchemaCatalogoTema.set('collection','CatalogoTema');
  return mongoose.model('catalogoTema', SchemaCatalogoTema);
}