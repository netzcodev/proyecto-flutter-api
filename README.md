
# Flutter Api Node.js- Express.js- Sequelize ORM

Esta es una REST API, construida 100% con javascript, usando arquitectura limpia, todo se maneja por capas.

**_Es muy importante que se tenga instalado docker ya que el repositorio está diseñado para que el desarrollo se haga por medio de contenedores docker_**

## Stack

[**Node**](https://nodejs.org/)

[**Express**](https://expressjs.com/)

[**Sequelize**](https://sequelize.org/)

[**Joi**](https://joi.dev/)

[**Docker**](https://www.docker.com/)

[**JWT**](https://jwt.io/)
## Estructura

- **config:** Configuración y lectura de varibales de entorno
- **db:** Todo lo relacionado con la capa de entidad, acá se encuentra alojada la configuración para la conexión de las migraciones, los modelos que se comunican con la base de datos, las migraciones para cambios en la base de datos y los seeders para hacer pruebas.
- **libs:** Se encuentran los archivos para el manejo de conexiones con la base de datos, la configuración de cual entorno se está trabajando y el dialecto de la base de datos (postgres, mysql, sqlite, etc...)
- **middlewares:** se alojan las funciónes que se usan para validacion de los datos, gestion de errores y validación de estructuras de datos de la entidades.
- **routes:** Contiene la capa de controladores, tiene un idex que invaca y agrega a la aplicación cada uno de los controladores pertenecientes al negocio y sus respectivos _end-point_ o _urls_ de acceso.
- **schemas:** Contiene los DTO (objetos de tranferencia de datos), con se modela la información que se quiere pasar a la base de datos y se valido, es decir, se verifica que cada campo enviado en el cuerpo de la petición sea del tipo correspondiente y correcto.
- **services:** Contiene todo lo referente a casos de uso y lógica de negocio, en esta capa se hacen las operaciones que requiera el negocio.
- **utils:** Esta capa contiene las estrategias de autenticación y funciones de ayuda para gestionar los datos.

## API Reference

Esta api cuenta con vesionamiento, es decir, se puede tener más de una versión y por la configuración se puede acomodar que afecta cada _end-point_

#### Estructura inicial

- **base_url:** Es la url por defecto del servidor donde corre, en desarrollo es localhost:3000

```http
 METHOD 200 {{base_url}}/api/v1/
```
_**Todas las rutas o end-points de la aplicación deben tener esta estructura inicial**_

#### Get all items

```http
  GET 200 /users
```
#### Get one item
```http
  GET 200 /users/:id
```
#### Add item
```http
  POST 201 /users
```
- **Nota:** La data se pasa por medio del body en formato JSON, para ver como va cada dato se debe entrar a la carpeta **schemas** y revisar el esquema de la entidad que se quiere crear.

#### Update item
```http
  PATCH 200 /users/:id
```
#### Delete item
```http
  DELETE 200 /users/:id
```
- **Nota:** Para ver con que ruta se crea cada entidad se debe ir a la carpeta **routes** y abrir el archivo **index.js**.
## Installation

Estando ubicados en la raíz del proyecto se debe ejecutar:

```bash
  npm install my-project
  npm run migrations:run
  docker-compose up -d
```
## [Migrations](https://sequelize.org/docs/v6/other-topics/migrations/)

Para poder hacer un cambio en la base de datos que se está ejecutando se debe primero generar la migración:

```bash
    npm run migrations:generate migration_name
```

Luego se debe abrir el archivo que se crea en **_db/migration/migration_name_** y se debe hacer el alter de la tabla por medio de la api que provee sequelize.

## [Data Base](https://expressjs.com/en/guide/database-integration.html#postgresql)

Para configurar la base de datos se debe instalar el driver respectivo.

- **Nota:** Por defecto está api funciona con PostgreSQL, esta sección es en caso de querer cambiar el motor de base de datos.

```bash
# Una de las siguientes bases de datos.:
$ npm install --save pg pg-hstore # Postgres
$ npm install --save mysql2 # mySql
$ npm install --save mariadb # Maria Db
$ npm install --save sqlite3 # SQlite
$ npm install --save tedious # Microsoft SQL Server
$ npm install --save oracledb # Oracle Database
```

Teniendo instalado el driver se procede a cambiar la propiedad _diealect_ en el archivo **libs/sequelize.js**, poner el valor correspondiente del motor que se haya instalado, si hay alguna duda [ver](https://sequelize.org/docs/v6/other-topics/dialect-specific-things/)


## Creación de app en producción.

El objetivo de agregar el contenedor app al archivo **_docker-compose.yml_** es poder correr toda la aplicación desde docker, pero de igual manera se puede correr con el demonio de node.

Para crear la imágen del docker se deben correr los siguiente comandos en la terminal:

```bash
  docker build -t nodeapp .
  docker-compose up -d
```

**Nota:** Esto guardará la imágen hasta los cambios acutales del proyecto, es como si fuera una versión de producción. **_si se van a trabajar cambios constantes y se requieren hacer pruebas desde el front lo mejor es hacerlo con:_**  _npm run dev_

**Nota:** Abrir docker y hacer stop de la imagen de nodeapp para que no genere conflicto en el puerto 3000

**Nota:** Puede que se generen errores al momento de hacer la versión de producción, para estos casos cambiar el host de la base de datos por 'postgres'
