#!/usr/bin/env python
# -*- coding: utf-8 -*-
'''
	Motor de envio de mensajes por WhatsApp, requiere de un coleccion de mensajes para enviar,
	esta puede estar localmente o en algun servidor foraneo.

	Para poder ejecutarlo porfavor lee nuestra documentación en https://github.com/LuisEnVilla/CheckTrips/wiki/WhatsAppEgine

	Cada 10 segundo verifica la BD en busca de mensajes, pero mantiene la comunicación con el servidor de WhatsApp
	para un envio instantaneo.
'''
#........................................................................
import sys
import os
import time
import base64
import pymongo
import datetime
from Yowsup.connectionmanager import YowsupConnectionManager
#.........................................................................
def onAuthSuccess (username):
	print("Autentificado con  %s" % username)
	methodsInterface.call("ready") 

def onMessageSent(jid,messageId):
	timesend = time.strftime('%y-%m-%d %H:%M:%S')
	print ("::.MessageEngine.:: Message sent to " + jid + " MessageID "+ str(messageId) + "TimeSend: " + timesend)

def onMessageDelivered(jid,messageId):
	timeDelivered = time.strftime('%y-%m-%d %H:%M:%S')
	print ("::.MessageEngine.:: Message sent to " + jid + " received " + timeDelivered)

def MessageSendCola():
	#Descomentar para usar una BD local.
	#client = pymongo.MongoClient()		#Hacer la coneccion con MongoDB.
	#db = client ['CheckTrip'] 			#Conectar con la base de datos.
	#Base de datos remota en NodeJitsu
	client = pymongo.MongoClient('mongodb://nodejitsu:e64f3734605edb11e40ec425b159ad7c@troup.mongohq.com:10077/nodejitsudb8852955766')
	db = client ['nodejitsudb8852955766']
	if db.Mensajes.count() > 0:
		date = db.Mensajes.find_one()
		Number = date [ "Destino" ].encode('utf-8')
		Message = date [ "Mensaje" ].encode('utf-8')
		IdDate = date [ "_id" ]
		db.Mensajes.remove({"_id":IdDate})
		client.close()
		print ("::.MessageEngine.:: 521"+str(Number)+"@s.whatsapp.net"+str(Message))
		methodsInterface.call("message_send",("521"+str(Number)+"@s.whatsapp.net",str(Message)))
	else:
		print ("::.MessageEngine.:: No hay Mensajes en Cola")

def espera():
    while True:
    	time.sleep(10) #espera entre cada mensaje enviado, se tomaron 10 segundos para evitar saturacion con WhatsApp
    	MessageSendCola()
#............................................................................
password = ""						#Pswd de Yowsup.
username = ''                       #Numero de WhatsApp.
keepAlive = True
sendReceipts = True  
password = base64.b64decode(bytes(password.encode('utf-8')))
connectionManager = YowsupConnectionManager()
connectionManager.setAutoPong(keepAlive)
signalsInterface = connectionManager.getSignalsInterface()
methodsInterface = connectionManager.getMethodsInterface()
signalsInterface.registerListener("receipt_messageSent", onMessageSent)
signalsInterface.registerListener("receipt_messageDelivered", onMessageDelivered)  
signalsInterface.registerListener("auth_success", onAuthSuccess)  
methodsInterface.call("auth_login", (username, password))
espera()