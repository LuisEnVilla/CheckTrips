#!usr/bin/env
# -*- coding: utf-8 -*-
'''
	Scrip de python, para extraer los datos de scv de una BD en MySQL, y exportarlos a MongoDB.
	En este caso, solo extrae los datos de Funcionarios.
'''
import MySQLdb
import pymongo
bd1 = MySQLdb.connect("localhost","root","","prev",unix_socket = "/opt/lampp/var/mysql/mysql.sock",use_unicode=True,charset="utf8")
cursor = bd1.cursor()
sql = "SELECT * FROM Institu"
try:
   cursor.execute(sql)
   resultados = cursor.fetchall()
   for i in resultados:
   	client = pymongo.MongoClient()		#Hacer la coneccion con MongoDB.
	db = client ['CheckTrip'] 			#Conectar con la base de datos.
	if db.Funcionario.find({"Nombre" : i[1], "ApellidoP" : i[2], "ApellidoM" : i[3]}).count() != 1:
		client = pymongo.MongoClient()		#Hacer la coneccion con MongoDB.
		db = client ['CheckTrip'] 			#Conectar con la base de datos.
		NReg = {
			"Nombre" : {
			"Nombres" : i[1],
			"ApellidoP" : i[2],
			"ApellidoM" : i[3]
			},
			"Trabajo" : {
				"Institucion" : i[0],
				"Cargo" : i[6],
				"CargoSuperior" : i[7],
				"UnidadAdministrativa" : i[8],
				"Clave" : i[9],
				"Puesto" : i[10],
			},
			"Correo" : i[11],
		}
		post_id = db.Funcionario.insert(NReg)
except:
   print "NO se pudo obtener el dato del Contacto ID= "
cursor.close()
bd1.close()