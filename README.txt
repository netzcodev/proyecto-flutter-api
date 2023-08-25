

// Para la rutas de la aplicación se maneja la carpeta routes
// se tiene un index.js que el el enrutador principal, se le
// agrega un estandar de primera versión /api/v1
// y se usa un roturer separado para cada entidad de la base de datos


Para gestionar toda la lógica transaccional de los datos usamos
una estructura de servicios, el servicio va a contener toda la lógica que
opera la base de datos, la captura del error y el envío de los resultados.

Se maneja la carpeta de middlewares que son lo que se usan
para el manejo de errores y validaciones del sistema

Se maneja una carpeta de schemas, ahí se generan los objetos que
validan los datos y su tipo de dato para cada entidad de la aplicación.
Son los que pupularmete se llaman DTOs (Data Transfer Object);

Se usa el archivo docker-compose.yml para setear las configuraciones
necesarias para el funcionamiento de una base de datos sin necesidad de
instalar drivers ni software aparte de docker.

La carpeta libs, o capa de librerías se encarga de conexiones a terceros.
sea apis o bases de datos.


Se usa el ORM squelize porque tiene una muy buena integración con javascrip
esto con el propósito de que la api se agnostica a la base de datos, es decir,
no se va a hacer solo para una base de datos sino que con alguna configuración diferente
pueda usar la base de datos SQL de su preferencia.
Incluso este orm es el que va a gestionar las conexiones a la db de la manera más optima.

# Una de las siguientes bases de datos.:
$ npm install --save pg pg-hstore # Postgres
$ npm install --save mysql2 # mySql
$ npm install --save mariadb # Maria Db
$ npm install --save sqlite3 # SQlite
$ npm install --save tedious # Microsoft SQL Server
$ npm install --save oracledb # Oracle Database

Para usar la programación orientada a objetos con el ORM se crean unos modelos, que representan
la entidad de la base de datos en una carpeta que se llama db/models
