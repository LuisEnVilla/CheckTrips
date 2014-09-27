#!usr/bin/env
# -*- coding: utf-8 -*-
'''
	Scrip de python, para extraer los datos de scv de una BD en MySQL, y exportarlos a MongoDB.
	En este caso, solo extrae los datos de tabuladordeviaticosporcargoyzonageografica.
'''
import MySQLdb
import pymongo
bd1 = MySQLdb.connect("localhost","root","","prev",unix_socket = "/opt/lampp/var/mysql/mysql.sock",use_unicode=True,charset="utf8")
cursor = bd1.cursor()
sql = "SELECT * FROM TabuladorViaticos"
try:
   cursor.execute(sql)
   resultados = cursor.fetchall()
   for i in resultados:
   	client = pymongo.MongoClient()		#Hacer la coneccion con MongoDB.
	db = client ['CheckTrip'] 			#Conectar con la base de datos.
	if i[1]=="NACIONAL":
		NReg = {
			"Grupo":i[0],
			"Tipo": i[1],
			"Zona": i[2],
			"Tarifa": i[3],
			"Moneda":"MXP"
		}
	else :
		NReg = {
			"Grupo":i[0],
			"Tipo": i[1],
			"Zona": "No Aplica",
			"Tarifa": i[3],
			"Moneda":"USD"
		}
	post_id = db.TabuladorViaticos.insert(NReg)
except:
   print "NO se pudo obtener el dato del Contacto ID= "
cursor.close()
bd1.close()