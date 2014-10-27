/*
Colección para definir los diferentes tipos de comiciones que se pueden seleccionar para un viaje.

  {
      "_id" : ObjectId("54265b4496f5d5892e36bb43"),
      "Tipo" : "Recibir capacitación",
      "Descripcion" : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis odio magni ipsa ipsum, iure quas neque id ratione cum, voluptatum dolorem illo porro. Laudantium dignissimos vitae, mollitia sed molestiae accusamus."
  }

*/
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