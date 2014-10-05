
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
- Mostrar datos por medio de un TOP 3, además de hacer consultas según funcionarios, viajes, instituciones y gastos de manera específica, delimitando las respuestas según los criterios de búsqueda realizados por el usuario.

##Dependencias
- MongoDB ~ v2.6.4
- NodeJS ~ v0.10.30
- Phyton ~ v2.6
- Express ~ v4.9.0



##Instalación / Configuración 
Instrucciones

Escoge una instalación de Python

- 1.-Identifica la versión de Windows que se ejecuta en tu PC. Tendrás que saber si estás ejecutando Windows 95, 98, NT, 2000, ME, XP, Vista o Windows 7.

- 2.-Decide si necesitarás el código fuente de Python. Instalar la fuente es opcional. Python es un software de código abierto, lo que significa que el código está disponible para los programadores para modificar o distribuir a su antojo.


- 3.-Dirígete a la página web Python.org. Todas las distribuciones oficiales del programa se pueden encontrar aquí, incluyendo un archivo. Msi instalador para Windows.

- 4.-Haz clic en el enlace "Descargar". Una lista de archivos aparecerá. Cada archivo es una distribución de Python para una plataforma específica.

- 5.-Encuentra el instalador para tu plataforma. Numerosas versiones de Python están disponibles para entornos Windows. Si eres incapaz de determinar la versión de Windows instalada en tu PC, descarga el instalador binario estándar.

- 6.-Elige el enlace "Windows Installer Python" para un entorno estándar, el "instalador Python AMD64" para equipos que ejecuten Windows 64-bit o el "Python Itanium de Windows Installer" para las computadoras Intel Itanium.

- 7.-Haz clic en el enlace de descarga. Puedes descargar el archivo y luego ejecutarlo, o bien puedes hacerlo automáticamente. Es recomendable descargarlo para que tengas una copia para su uso futuro.

EJECUTA EL INSTALADOR:

- 1.-Ejecuta el instalador, si no lo ejecutaste automáticamente desde el diálogo de descarga. Busca el archivo. Msi usando Windows explorer y ejecútalo. Un programa de instalación se abrirá. Haz clic en "Instalar para todos los usuarios" y luego en "Siguiente".

- 2.-Escoge un directorio de instalación para Python. El valor por defecto, "C: \ Python25", se recomienda, ya que pueden darse situaciones en que será útil para que escribas la ruta completa al intérprete de Python desde la línea de comandos. Un nombre de directorio corto en la unidad C: \ es más fácil de escribir.

- 3.-Elige las funciones que deseas instalar y haz clic en "Siguiente" para iniciar la instalación. Espera unos minutos para que el proceso se complete. Una vez que se haya instalado Python, haz clic en "Finalizar" para cerrar el instalador.

- 4.-Haz clic en "Programas", "Python 2.5" y luego "Python" desde el menú Inicio de Windows para probarlo. Una ventana en negro y blanco se abrirá con un comando interactivo de Python del sistema. Una vez que hayas confirmado que el programa está instalado correctamente, cierra la ventana.

- 5.-Abre un prompt de comando haciendo clic en "Inicio" y luego en "Ejecutar". Cuando el diálogo se abra, escribe "cmd" en el cuadro de búsqueda y presiona "Aceptar". Ejecutar los programas de Python desde la línea de comandos es una forma útil de ver el destino y pasar parámetros.

- 6.-Cambia a tu directorio de Python. Si aceptas el directorio por defecto, escribe "cd C: \ Python25" en el prompt del comando y presiona "Enter". Si lo has instalado en otro lugar, cambia "C: \ Python25" a la carpeta de instalación. Escribe "python" y presiona "Enter" para iniciar la línea de comandos de Python del sistema.

##Screenshots
Añadir algún screenshot interesante del proyecto. Muy recomendable.

##Demo
Un enlace a una demostración en línea de su proyecto, así como un link a un screencast de máximo 4 minutos.

##¿Preguntas o problemas? 
Esta sección describe cómo otros desarrolladores y los usuarios deben interactuar con su proyecto. Aquí un ejemplo:

Mantenemos la conversación del proyecto en nuestra página de problemas [issues] (https://github.com/CodeandoMexico/repo-guidelines/issues). Si usted tiene cualquier otra pregunta, nos puede contactar por correo <retos@codeandomexico.org>.

##Contribuye
Sección para explicar cómo contribuir a su proyecto. Debe añadir enlace al archivo CONTRIBUTING.md. Ejemplo:

Queremos que este proyecto sea el resultado de un esfuerzo de la comunidad. Usted puede colaborar con [código](https://github.com/CodeandoMexico/repo-guidelines/pulls), [ideas](https://github.com/CodeandoMexico/repo-guidelines/issues) and [bugs](https://github.com/CodeandoMexico/repo-guidelines/issues).

##Equipo
Indique los miembros del equipo principal que son responsables del desarrollo y mantenimiento de este proyecto. Añadir una referencia a sus perfiles de GitHub/Twitter/LinkedIn. Ejemplo:

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



##Licencia
Copyright [2014] [CheckTrips]

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
