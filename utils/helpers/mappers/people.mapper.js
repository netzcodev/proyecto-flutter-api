function peopleMapper(json) {
  return {
    id: json.id,
    document: json.document || 0,
    name: json.name,
    lastName: json.lastName,
    phone: json.phone || '',
    email: json.email,
    photo: json.photo || '',
    status: json.status,
    roleId: json.role.id,
    role: json.role.name || 'cliente',
    createdAt: json.createdAt,
    updatedAt: json.updatedAt
  }
}

module.exports = {
  peopleMapper,
}
