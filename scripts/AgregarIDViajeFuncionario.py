#!usr/bin/env
# -*- coding: utf-8 -*-
'''
	Scrip de python, Para eliminar los espacios al inicio y fin de los datos.
'''
import pymongo

client = pymongo.MongoClient()
db = client ['CheckTrip']
acumulador = db.Funcionario.find()
for i in acumulador:
	#print i['Nombre']['Nombres']
	client = pymongo.MongoClient()
	db = client ['CheckTrip']
	acumuladorViaje = db.Viaje.find({"Funcionario_id":i["_id"]})
	client = pymongo.MongoClient()
	db = client ['CheckTrip']
	viajesId = []
	for x in acumuladorViaje:
		viajesId.append(x["_id"])
	if viajesId != []:
		#print db.Funcionario.update({"_id":i["_id"]},{"$set":{"Viajes":[]}})
		print db.Funcionario.update({"_id":i["_id"]},{"$pushAll":{"Viajes":viajesId}})
	#print db.Funcionario.update({"_id":i["_id"]},{"$set" : {"Viajes_id":acumuladorViaje[x]["_id"]}})
	#print db.Funcionario.update({"_id":i["_id"]},{"$set":{"Nombre.Nombres":i['Nombre']['Nombres'].strip()}})
	#print db.Funcionario.update({"_id":i["_id"]},{"$set":{"Trabajo.Cargo":i['Trabajo']['Cargo'].strip(),"Trabajo.Institucion":i['Trabajo']['Institucion'].strip(),"Trabajo.Puesto":i['Trabajo']['Puesto'].strip(),"Trabajo.Clave":i['Trabajo']['Clave'].strip()}})
	#print db.Funcionario.update({"_id":i["_id"]},{"$set":{"Correo":i['Correo'].strip()}})