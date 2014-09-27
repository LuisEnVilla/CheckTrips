#!usr/bin/env
# -*- coding: utf-8 -*-
'''
	Scrip de python, para extraer los datos de scv de una BD en MySQL, y exportarlos a MongoDB.
	En este caso, solo extrae los datos de los Viajes.
'''
import MySQLdb
import pymongo
bd1 = MySQLdb.connect("localhost","root","","prev",unix_socket = "/opt/lampp/var/mysql/mysql.sock",use_unicode=True,charset="utf8")
cursor = bd1.cursor()
sql = "SELECT * FROM viajes"
try:
   cursor.execute(sql)
   resultados = cursor.fetchall()
   for i in resultados:
   	client = pymongo.MongoClient()		#Hacer la coneccion con MongoDB.
	db = client ['CheckTrip'] 			#Conectar con la base de datos.
	NReg = {
		"MecanismoOrigen" : i[0],
		"InstitutoGenera" : i[1],
		"UnidadResponsable" : i[2],
		"TipoRepresentacion" : i[3],
		"Consecutivo" : i[4],
		"Tipo" : i[8],
		"Acuerdo" : i[9],
		"Oficio" : i[10],
		"Origen":{
			"Pais" : i[11],
			"Estado" : i[12],
			"Ciudad" : i[13]
		},
		"Destino":{
			"Pais" : i[14],
			"Estado" : i[15],
			"Ciudad" : i[16],
			"Zona" 	: "No Aplica"
		},
		"TarifaDiaria" : i[17],
		"Moneda" : i[18],
		"Tema" : i[19],
		"TipoComision" : i[20],
		"DatosEvento":{
			"Nombre" : i[21],
			"URL" : i[22],
			"FechaInicioPart" :i[23],
			"FechaFinPart" : i[24],
		},
		"MotivoComision" : i[25],
		"Antecedentes" : i[26],
		"Actividad" : i[27],
		"Resultado" : i[28],
		"Contribucion" : i[29],
		"URLComunicado" : i[30],
		"Pasaje" : {
			"CubrePasaje" : i[31],
			"TipoPasaje" : i[32],
			"LineaOrigen" : i[33],
			"VueloOrigen" : i[34],
			"LineaRegreso" : i[35],
			"VueloRegreso" : i[36],
		},
		"Hospedaje" : {
			"CubreHospedaje" : i[41],
			"NombreHotel" : i[42],
			"FechaEntrada" : i[43],
			"FechaSalida" : i[44],
			},
		"CostoHospedaje" : i[45],
		"GastoPasaje":i[39],
		"GastosViaticos" : i[40],
		"ViaticosComp" : i[46],
		"ViaticosNoComp" : i[47],
		"ViaticosDevueltos" : i[48],
		"FechaInicio" : i[37],
		"FechaFin" : i[38],
		"Observaciones":i[49]
	}
	post_id = db.Viaje.insert(NReg)
	
except:
   print "NO se pudo obtener el dato del Contacto ID= "
cursor.close()
bd1.close()