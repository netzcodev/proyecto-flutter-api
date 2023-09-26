const { serivceMapper } = require('./service.mapper');

function scheduleMapper(json) {
  let services = [];
  if (json.services) {
    services = json.services.map(item => serivceMapper(item));
  }

  return {
    id: json.id,
    customerId: json.customerId ? json.customerId : json.customer_id,
    employeeId: json.employeeId ? json.employeeId : json.employee_id,
    date: json.date,
    time: json.time,
    name: json.name,
    description: json.description,
    createdAt: json.createdAt ? json.createdAt : json.created_at,
    updatedAt: json.updatedAt ? json.updatedAt : json.updated_at,
    services: services,
  }
}

module.exports = {
  scheduleMapper,
}
