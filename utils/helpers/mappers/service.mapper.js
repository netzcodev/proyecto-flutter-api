
function serivceMapper(json) {
  return {
    id: json.id,
    serviceTypeId: json.serviceTypeId,
    currentDate: json.currentDate,
    commingDate: json.commingDate,
    name: json.name,
    duration: json.duration,
    description: json.description,
    createdAt: json.createdAt,
    updatedAt: json.updatedAt
  }
}

module.exports = {
  serivceMapper,
}
