function userLogginMapper(json) {

  return {
    id: json.user.id,
    email: json.user.email,
    role: json.user.role.name,
    fullName: `${json.user.customer.people.name} ${json.user.customer.people.lastName}`,
    token: json.token
  }
}

module.exports = {
  userLogginMapper,
}
