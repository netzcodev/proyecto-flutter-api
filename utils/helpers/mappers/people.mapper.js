function peopleMapper(json) {
  return {
    id: json.id,
    document: json.document || 0,
    name: json.name,
    lastName: json.lastName,
    phone: json.phone || '',
    email: json.email,
    password: json.password,
    photo: json.photo || '',
    status: json.status,
    userId: json.userId,
    role: json.user.role.name || 'cliente',
    createdAt: json.createdAt,
    updatedAt: json.updatedAt
  }
}

module.exports = {
  peopleMapper,
}
