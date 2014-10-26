/*
  Collección de todos los municipios, con su respectiva area geografiaca a la que pertenece, A o B
  {
    "_id" : ObjectId("54265639f1e8c51ab29bdbc6"),
    "NOmbreMunicipio" : "Aguascalientes",
    "ClaveEntidad" : "1",
    "ClaveMunicipal" : "1",
    "NombreEntidad" : "Aguascalientes",
    "AreaGeo" : "B"
  }
*/
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