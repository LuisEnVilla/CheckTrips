/*exports = module.exports = function(app, mongoose) {
	var SchemaFuncionario = new mongoose.Schema({
		Correo: { type: String },
		Nombre: { 
			Nombres : {type : String},
			ApellidoP : {type : String},
			ApellidoM : {type : String}
		 },
		Trabajo: {
			Cargo : {type : String},
			CargoSuperior : {type:String},
			Institucion : {type:String},
			Puesto : {type:String},
			Clave : {type:String},
			UnidadAdministrativa : {type:String}
		}
	});
	mongoose.model('Funcionario', SchemaFuncionario);
};
*/
module.exports = function(mongoose) {
  var Schema = mongoose.Schema;
  // Objeto modelo de Mongoose
  var SchemaFuncionario = new Schema({
    // Propiedades
    Correo: String,
	Nombre: { 
		Nombres : String,
		ApellidoP : String,
		ApellidoM : String
	 },
	Trabajo: {
		Cargo : String,
		CargoSuperior : String,
		Institucion : String,
		Puesto : String,
		Clave : String,
		UnidadAdministrativa : String
	}
  });
  SchemaFuncionario.set('collection','Funcionario');
  return mongoose.model('Funcionario', SchemaFuncionario);
}