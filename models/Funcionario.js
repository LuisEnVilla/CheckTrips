/*
Colección para almacenar todos los funcionarios.

	{
	    "_id" : ObjectId("54261c6ef1e8c5112edf7381"),
	    "Correo" : "liliana.herrera@ifai.org.mx",
	    "Nombre" : {
	        "Nombres" : "Liliana",
	        "ApellidoP" : "Herrera",
	        "ApellidoM" : "Martín"
	    },
	    "Trabajo" : {
	        "Cargo" : "Secretaría Particular",
	        "CargoSuperior" : "Comisionado",
	        "Institucion" : "INSTITUTO FEDERAL DE ACCESO A LA INFORMACIÓN Y PROTECCIÓN DE DATOS ORGANISMO AUTÓNOMO en proceso de reestructuración",
	        "Puesto" : "SECRETARIO PARTICULAR DE PONENCIA",
	        "Clave" : "MC03",
	        "UnidadAdministrativa" : "Comisionado"
	    },
	    "Aclaraciones" : 0,
	    "Vistas" : 0
	}

*/
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