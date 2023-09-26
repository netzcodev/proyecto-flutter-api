
function serivceMapper(json) {
  return {
    id: json.id,
    serviceTypeId: json.serviceTypeId ? json.serviceTypeId : json.service_type_id,
    currentDate: json.currentDate ? json.currentDate : json.current_date,
    comingDate: json.commingDate ? json.commingDate : json.coming_date,
    name: json.name,
    duration: json.duration,
    description: json.description,
    mileage: json.mileage,
    vehicleId: json.vehicleId ? json.vehicleId : json.vehicle_id,
    createdAt: json.createdAt ? json.createdAt : json.created_at,
    updatedAt: json.updatedAt ? json.updatedAt : json.updated_at
  }
}

module.exports = {
  serivceMapper,
}
