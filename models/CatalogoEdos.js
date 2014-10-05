module.exports = function(mongoose) {
  var Schema = mongoose.Schema;
  // Objeto modelo de Mongoose
  var SchemaCatalogoEdos = new Schema({
    // Propiedades
    _id : Schema.Types.ObjectId,
    NOmbreMunicipio : String,
    ClaveEntidad : String,
    ClaveMunicipal : String,
    NombreEntidad : String,
    AreaGeo : String
  });
  SchemaCatalogoEdos.set('collection','AreaGeografica');
  return mongoose.model('CatalogoEdos', SchemaCatalogoEdos);
}