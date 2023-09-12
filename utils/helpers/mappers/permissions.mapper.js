
function permissionMapper(permission) {
  return {
    menuName: permission.menu.name,
    add: permission.add,
    read: permission.read,
    modify: permission.modify,
    remove: permission.remove
  }
}

module.exports = {
  permissionMapper,
}
