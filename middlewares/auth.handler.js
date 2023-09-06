const boom = require('@hapi/boom');
const { config } = require('../config/config');

function chechApiKey(req, res, next) {
  const apiKey = req.headers['api'];

  if (apiKey === config.apiKey) {
    next();
  } else {
    next(boom.unauthorized());
  }
}

function checkAdminRole(req, res, next) {
  const user = req.user;
  if (user.role == 'admin') {
    next();
  } else {
    next(boom.unauthorized());
  }
}

/**
 * TODO: Crear un metodo para verificar los permisos por role, para devolver en un array las options
 * TODO: diponibles para cada usuario, es decir, qué puede hacer y qué no.
 * !: Enviar a este middleware los argumentos normales, un tras otro, sin meterlo ente corchetes.
 */
function checkRoles(...roles) {
  return (req, res, next) => {
    const user = req.user;
    if (roles.includes(user.role)) {
      next();
    } else {
      next(boom.unauthorized());
    }
  }
}

function checkStatus(req, res, next) {
  const user = req.user;
  if (user) {
    next();
  } else {
    next(boom.unauthorized());
  }
}

module.exports = {
  chechApiKey,
  checkAdminRole,
  checkRoles,
  checkStatus
}
