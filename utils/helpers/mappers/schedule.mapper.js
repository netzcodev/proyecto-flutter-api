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
    occupiedTimes: json.dataValues.occupiedTimes ? json.dataValues.occupiedTimes : [],
  }
}

function occupiedTimesMapper(json) {
  return to12HourFormat(json.time);
}

const to12HourFormat = time => {
  const [hour, minute] = time.split(':');
  const h = (hour % 12) || 12;
  const ampm = hour < 12 || hour === '24' ? 'AM' : 'PM';
  return `${h}:${minute} ${ampm}`;
};

module.exports = {
  scheduleMapper,
  occupiedTimesMapper,
  to12HourFormat
}
