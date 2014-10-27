/*
Colección de Temas para los viajes. Insertando temas an la BD, con este modelo, 
se podrán actualizar, crear o borrar, temas para los viajes.

  {
      "_id" : ObjectId("5426589e96f5d5892e36bb36"),
      "Tema" : "Políticas de acceso a la información",
      "Descripcion" : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste est distinctio quaerat enim ab voluptates nostrum assumenda praesentium, mollitia nobis, eligendi, doloribus error! Fugit veniam quia, non quod facere placeat."
  }
*/
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