module.exports = function(mongoose) {
  var Schema = mongoose.Schema;
  // Objeto modelo de Mongoose
  var SchemaUnidad = new Schema({
    // Propiedades
    _id : Schema.Types.ObjectId,
    Descripcion : String,
    Nombre : String,
    Viajes : [],
    Funcionarios : [],
    CounViajes :Number,
    CountFuncionarios: Number
  });
  SchemaUnidad.set('collection','Unidad');
  return mongoose.model('Unidad', SchemaUnidad);
}