module.exports = function(mongoose) {
  var Schema = mongoose.Schema;
  // Objeto modelo de Mongoose
  var SchemaFuncionario = new Schema({
    // Propiedades
    _id : Schema.Types.ObjectId,
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
		UnidadAdministrativa : String,
	},
	Viajes : [{ type: Schema.ObjectId, ref: 'Viaje' }],
	Vistas : Number,
	Aclaraciones : Number
  });
  SchemaFuncionario.set('collection','Funcionario');
  return mongoose.model('Funcionario', SchemaFuncionario);
}