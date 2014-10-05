module.exports = function(mongoose) {
  var Schema = mongoose.Schema;
  // Objeto modelo de Mongoose
  var SchemaCatalogoComision = new Schema({
    // Propiedades
    _id : Schema.Types.ObjectId,
    Descripcion : String,
    Tipo:String
  });
  SchemaCatalogoComision.set('collection','CatalogoTipoComision');
  return mongoose.model('catalogoComision', SchemaCatalogoComision);
}