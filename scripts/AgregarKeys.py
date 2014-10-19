#!usr/bin/env
# -*- coding: utf-8 -*-
'''
	Scrip de python, para agregar campos a los registros de cada viaje, como Vistas, Ranking, GastoTotal 
'''
import pymongo

def convertidorFloat(value):
	try:
		x = float(value)
		return x
	except ValueError:
		x = 0
		return x
		

client = pymongo.MongoClient()
db = client ['CheckTrip']
#acumulador = db.Viaje.find()  #Descomentar para agregar Visitas, GastosTotal
#acumulador = db.Viaje.find().sort("GastoTotal",pymongo.DESCENDING) #Descomentar para Ranking
acumulador = db.Funcionario.find()
c = 0
for i in acumulador:
	c = c+1
	client = pymongo.MongoClient()
	db = client ['CheckTrip']
	#GastoTotal = convertidorFloat(i["GastoPasaje"]) + convertidorFloat(i["CostoHospedaje"]) + convertidorFloat(i["GastosViaticos"])
	#print db.Viaje.update({"_id":i["_id"]},{"$set" : {"Vistas": 0}})
	#print db.Viaje.update({"_id":i["_id"]},{"$set" : {"GastoTotal": GastoTotal}})
	#print db.Viaje.update({"_id":i["_id"]},{"$set" : {"Ranking": c}})
	print db.Funcionario.update({"_id":i["_id"]},{"$set" : {"Vistas": 0}})