module.exports = function(mongoose) {
  var Schema = mongoose.Schema;
  // Objeto modelo de Mongoose
  var SchemaViaje = new Schema({
    // Propiedades
    _id : Schema.Types.ObjectId,
    Funcionario_id : {type : Schema.Types.ObjectId , ref : 'Funcionario'},
    Resultado : String,
    Tipo : String,
    GastoPasaje : Number,
    Actividad : String,
    CostoHospedaje : Number,
    TipoRepresentacion : String,
    Tema : String,
    ViaticosDevueltos : Number,
    FechaInicio : String,
    Hospedaje : {
        FechaEntrada :String,
        NombreHotel : String,
        CubreHospedaje : String,
        FechaSalida :String
    },
    Consecutivo : String,
    Origen : {
        Pais : String,
        Ciudad : String,
        Estado : String
    },
    TarifaDiaria : Number,
    Acuerdo : String,
    MecanismoOrigen : String,
    Antecedentes : String,
    ViaticosComp : Number,
    FechaFin :String,
    TipoComision : String,
    Oficio : String,
    Observaciones : String,
    GastosViaticos : Number,
    MotivoComision : String,
    UnidadResponsable : String,
    Destino : {
        Pais : String,
        Ciudad : String,
        Estado : String,
        Zona : String
    },
    InstitutoGenera : String,
    DatosEvento : {
        URL : String,
        Nombre : String,
        FechaFinPart :String,
        FechaInicioPart :String
    },
    Pasaje : {
        LineaOrigen : String,
        LineaRegreso : String,
        VueloOrigen : String,
        TipoPasaje : String,
        CubrePasaje : String,
        VueloRegreso : String
    },
    Moneda : String,
    Contribucion : String,
    URLComunicado : String,
    ViaticosNoComp : Number,
    Aclaraciones : Number,
    Vistas : Number,
    GastoTotal: Number,
    Ranking: Number
  });
  SchemaViaje.set('collection','Viaje');
  return mongoose.model('Viaje', SchemaViaje);
}