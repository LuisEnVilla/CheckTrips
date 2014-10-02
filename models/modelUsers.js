module.exports = function(mongoose) {
  var Schema = mongoose.Schema;
  // Objeto modelo de Mongoose
  var SchemaUsers = new Schema({
    // Propiedades
    _id : Schema.Types.ObjectId,
    PhoneNumber : String,
    Name : String,
    Email : String,
    FuncionariosSeguidos : [Schema.Types.ObjectId],
    ViajeSeguidos : [Schema.Types.ObjectId]
  });
  SchemaUsers.set('collection','Users');
  return mongoose.model('Users', SchemaUsers);
}