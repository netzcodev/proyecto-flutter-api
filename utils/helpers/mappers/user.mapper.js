const { permissionMapper } = require('./permissions.mapper');

function userLogginMapper(json) {
  const menus = json.user.role.permissions.map(item => permissionMapper(item));
  return {
    id: json.user.id,
    email: json.user.email,
    role: json.user.role.name,
    fullName: `${json.user.name} ${json.user.lastName}`,
    token: json.token,
    menu: menus,
  }
}

module.exports = {
  userLogginMapper,
}
