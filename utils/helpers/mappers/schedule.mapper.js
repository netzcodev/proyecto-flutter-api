const { serivceMapper } = require('./service.mapper');

function scheduleMapper(json) {
  const services = json.services.map(item => serivceMapper(item));
  return {
    id: json.id,
    customerId: json.customerId,
    employeeId: json.employeeId,
    date: json.date,
    time: json.time,
    name: json.name,
    description: json.description,
    createdAt: json.createdAt,
    updatedAt: json.updatedAt,
    services: services,
  }
}

module.exports = {
  scheduleMapper,
}
