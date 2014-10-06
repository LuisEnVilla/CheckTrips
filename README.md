
README CheckTrips
============

Hoy en día nosotros como sociedad necesitamos transparencia, manejo y gestión de la información que se crea según los movimientos de quienes nos gobiernan; por eso nos damos a la encomienda de crear un Aplicación web que permita observar claramente y a detalle estas situaciones.

Checktrips es una plataforma especializada en la visita guiada de los viajes que realizan servidores públicos tanto en la república mexicana, asi como al extranjero. Es dinámica, de fácil uso y  orientada al público en general que busca respuestas, cumpliendo asi con los objetivos de este reto:
- Transparentar inteligentemente la información pública que se genera sobre los viajes de trabajo nacionales e internacionales de los comisionados y los servidores públicos del IFAI para fomentar un debate público informado y rendir cuentas en la materia.
- Desarrollar una herramienta web de código abierto que pueda ser replicada a nivel nacional e internacional por otras instituciones públicas.
- Generar una primera práctica de reutilización de datos abiertos sobre viajes de trabajo para retroalimentar un posible primer estándar de publicación de datos abiertos en viajes de servidores públicos.
- Difundir y dar uso a la información derivada de los trabajos realizados durante los viajes para asociar su costo a los resultados que producen a la luz de las tareas sustantivas y agenda estratégica de la institución.
- Generar estadísticas y métricas sobre distintos aspectos de los viajes de trabajo, así como visualizaciones que permitan realizar comparaciones históricas, temáticas y por servidor público, y que faciliten el seguimiento y la evaluación.

Este proyecto esta basado en la nueva tendencia que google trae para nosotros: [“Google Material Design”]( http://www.google.com/design/spec/material-design/introduction.html#) con su interfaz práctica y manejable. Esta gran empresa tiene un lema… “Concentrate en el usurio y todo lo demás seguirá.”(“Focus on the user and all else will follow.”) por eso decidimos realizar una amplia investigación para lograr asi una implementación de Software inteligente y amigable con la sociedad, sin dejar de un lado el gran impacto que se pretende con el manejo de información que el IFAI brindará al individuo mexicano. 


Por ser de uso General se podrá manipular por 3 tipos de individuos:
- Usuario: Se refiere a público en General. Contarán con el servicio de viajes realizados, perfiles de funcionarios, costos generales, detalles importantes como viáticos, hospedaje y  compartir esa información en redes sociales, comparar 2 perfiles y demostrar con su visualización amigable una inconformidad de manera sencilla. Otra caracteristica de nuestro Proyecto es el uso de WhatsApp para el seguimiento de los funcionarios. Cuando este de de alta un nuevo viaje, aparecerá un mensaje de nuestra plataforma que avisara una actualización o aclaracion en proceso.
- Funcionario: Son las personas que mostrarán el control de sus viajes, cuanto dinero manejan, sus gastos, cargos, dependencias a la que pertencen, relacion de costos y sus medios de contacto básico. Para ellos se ofrecen la edicion de viajes, notificaciones de inconformidad según la sociedad mexicana, si ya se ha actualizado ó aclarado algún proceso.
- Administrador (ifai): Persona encargada del manejo de la información respectiva de cada área; serán quienes gestionen las bases de datos y manejen la plataforma segun la encomienda que se tenga. Agregan funcionarios, viajes, temas, tipos de comision, representacion y demás datos adicionales que los funcionarios podrán escoger para sus perfiles.

API:
- Permitir el intercambio de la información por medio de esta App.
- Mostrar datos por medio de un TOP 4, además de hacer consultas según funcionarios, viajes, instituciones y gastos de manera específica, delimitando las respuestas según los criterios de búsqueda realizados por el usuario.
- Ademas con consultas predetermindadas, como los viajes mas costosos en viaticos, hospedaje y pasajes.
- Con una sconsulta simple, la aplicacion te devolvera un JSon con todos los datos que necesitas.

para saber como utilizarla por favor consulta la [wiki](https://github.com/LuisEnVilla/CheckTrips/wiki/Introducci%C3%B3n:)

##Dependencias
- MongoDB ~ v2.6.4
- NodeJS ~ v0.10.30
- Phyton ~ v2.6
- Express ~ v4.9.0



##Instalación / Configuración 
Para lograr el buen funcionamiento de esta App Web se necesita instalar las Dependencias anteriormente mencionadas de esta forma:

- 1 Phyton
- 1.1 Pymongo

- 2 Node JS
- 2.2 Express

- 3 MongoDB

Despues de haber instalado las dependencias mencionadas anteriormente, clona el repositorio [CheckTrips](https://github.com/LuisEnVilla/CheckTrips.git).
Ejecuta el servidor mongod, que se instala junto con MongoDB. Para agregar la base de datos que esta en la carpeta BD del proyecto.
Una vez agregada diriguete a la rais del proyecto y ejecuta desde la terminal npm install, para instalar todas las dependencias necesarias del proyecto.
Sin dejar de ejecutar el servidor mongod, ejecuta como administrador npm start, lo que hara que inicie el servidor NodeJs, con todo lo necesario. 
Ahora solo rediriguete en tu navegador a localhost y podras vizualizar la app funcionando.
Si necesitas mayor información visita nuestro [wiki.](https://github.com/LuisEnVilla/CheckTrips/wiki/Instalaci%C3%B3n-de-Dependencias:)

##Screenshots
**Pantalla de inicio "CheckTrips"**
![Alt text](https://lh5.googleusercontent.com/eaxwuCJd_cI5XwZWUQM1PwzZMcJr78Ou8eTh03RwMTpOQWLBR4g9Oe6ISLZmouv328aSes8o11g=w1342-h533)
![Alt text](https://lh3.googleusercontent.com/Yu-8hHlgBTZYxB2nXRBDTGcQrxQZ-7qejkAwCJWuSSegIWSpCsiWn1EwVnOUlIE-b1j-mlU_jlU=w1342-h490)
![Alt text](https://lh5.googleusercontent.com/6W9qR1ESHTEC6OV79g5gIue8KHcGDcwnf3vA4tZ2BmSDgAiXSs2yy5yWf40SD7W7LqFMHYQehJ4=w1342-h490)
![Alt text](https://lh5.googleusercontent.com/BL2UQj6oyNZPbcVhdVu4HHTxOpOcPBFlkgaaWlnJbJmw_NaGzvIFAdfVc8HeCnrMvFExjifyAZw=w1342-h490)
![Alt text](https://lh6.googleusercontent.com/sMCVhCemXNLYXw4_W-GTLt1YiWvqf66ItD5DfGakELLZYR9RJ3wkzpEPDL_nAFOPb3MezY0YkqI=w649-h469)
![Alt text](https://lh5.googleusercontent.com/JCAHr60cJfi-n_jCYYdyQNh1lHMxiTqWkBO4uBhSFB-IQp9hwh4G6uV-eVH3xwc4jZEIK12cdSs=w1342-h490)
![Alt text](https://lh6.googleusercontent.com/slwTeEtFRzevIP4Eb1h1q2d99Yd8qbwoTdTqEnZO5Kl923nraPYEBDPWxrzIwZzFyB3koYaaKes=w1342-h560)

![Alt](https://lh5.googleusercontent.com/K3v4zwBrteC5o2FhS6vIf4eElq9F8E7cn-iiJKHTZINM1coEhfLcOq_vPvzyfwclGPdTbt4dqHk=w1342-h560)
![Alt](https://lh5.googleusercontent.com/9Uy6t5JzyGu_SJ59F5XiX5CIv7Z-lSWdToeg0ivYmaolSR_LOK2OOmQNDufqAf2caRdj0DapLQE=w1342-h560)
![Alt](https://lh4.googleusercontent.com/isZ_xBOa7R0o0ZeObw6X9pinc5r6pF6rpt-xvOA3M-SGgyw1hDyweTSWBTXTa6hHH0h4YF9XOGA=w1342-h560)



##Demo
En esta pagina estara el primer prototipo de la aplicacion funcionando con algunas limitantes. [CheckTrips](checktrips.mx)

Pueden visualizar [ScreenCast]( http://youtu.be/gL7IANu46Ps)

##¿Preguntas o problemas? 
Cual quier problema favor de contactar con cualquier integrante del equipo, al final se agregan algunos contactos en redes sociales. Al igual que se tomaran en cuenta sugerencias, la app es libre y lo es para mejorar.

##Contribuye


Sección para explicar cómo contribuir a su proyecto. Debe añadir enlace al archivo CONTRIBUTING.md. Ejemplo:

Queremos que este proyecto sea el resultado de un esfuerzo de la comunidad. Usted puede colaborar con [código](https://github.com/CodeandoMexico/repo-guidelines/pulls), [ideas](https://github.com/CodeandoMexico/repo-guidelines/issues) and [bugs](https://github.com/CodeandoMexico/repo-guidelines/issues).

##Equipo
Miembros del equipo principal que son responsables del desarrollo y mantenimiento de este proyecto:

Github: 
- [Luis Enrique Villa Trejo](https://github.com/LuisEnVilla)
- [Claudio Axel Ramiro Flores](https://github.com/AxelRamiro)
- [María Sarahi Oyervides García](https://github.com/SaraOyervides)

Linkedin:
- [Luis Enrique Villa Trejo](https://mx.linkedin.com/pub/luis-enrique-villa/82/328/7aa)
- [Claudio Axel Ramiro Flores](https://mx.linkedin.com/pub/axel-ramiro/a4/921/a2)
- [María Sarahi Oyervides García](https://mx.linkedin.com/pub/sara-oyervides/a5/602/716/)
 
twitter:
- Luis Enrique Villa Trejo (@luisvillak)
- María Sarahi Oyervides García (@Sara_Oyervides)


Carta Protesta:
-[Claudio Axel Ramiro Flores](https://drive.google.com/file/d/0B8ggoF5KLg2bVG52OXQzckhEN2M/view?usp=sharing)
-[Luis Enrique Villa Trejo](https://drive.google.com/file/d/0B8ggoF5KLg2bd0V4LWNHWEFLaWM/view?usp=sharing)
-[María Sarahi Oyervides García](https://drive.google.com/file/d/0B8ggoF5KLg2bLTI1WDR5WWw0NEU/view?usp=sharing)


##Licencia
Copyright 2014 IDE "Idea, Desarrolla y Emprende"

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
