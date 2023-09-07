function userLogginMapper(json) {
  return {
    id: json.user.id,
    email: json.user.email,
    role: [json.user.user.role.id, json.user.user.role.name],
    fullName: `${json.user.name} ${json.user.lastName}`,
    token: json.token
  }
}

module.exports = {
  userLogginMapper,
}
