#!usr/bin/env
# -*- coding: utf-8 -*-
'''
	Scrip de python, para extraer los datos de scv de una BD en MySQL, y exportarlos a MongoDB.
	En este caso, solo extrae los datos de Areas geograficas, separadas por ciudades y estados.
'''
import MySQLdb
import pymongo
bd1 = MySQLdb.connect("localhost","root","","prev",unix_socket = "/opt/lampp/var/mysql/mysql.sock",use_unicode=True,charset="utf8")
cursor = bd1.cursor()
sql = "SELECT * FROM Estructura"
try:
   cursor.execute(sql)
   resultados = cursor.fetchall()
   for i in resultados:
   	client = pymongo.MongoClient()		#Hacer la coneccion con MongoDB.
	db = client ['CheckTrip'] 			#Conectar con la base de datos.
	NReg = {
		"ClaveEntidad":i[0],
		"NombreEntidad": i[1],
		"ClaveMunicipal": i[2],
		"NOmbreMunicipio": i[3],
		"AreaGeo": i[4]
	}
	post_id = db.AreaGeografica.insert(NReg)
except:
   print "NO se pudo obtener el dato del Contacto ID= "
cursor.close()
bd1.close()