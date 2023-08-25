const boom = require('@hapi/boom');

function validatorHandler(schema, prop) {
  //* retorno un clousure que me continua la lógica de middleware.
  return (req, res, next) => {
    const data = req[prop]
    const { err } = schema.validate(data);
    if (err) {
      next(boom.badRequest(err));
    }
    next();
  }

}

module.exports = validatorHandler
