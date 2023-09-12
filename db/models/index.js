// este archivo se va a encargar de sincronizar e iniciar los modelos.
const { Vehicle, VehiclesModelSchema } = require('./vehicles.model');
const { People, PeopleModelSchema } = require('./people.model');
const { ServicesType, ServicesTypesModelSchema } = require('./servicestypes.model');
const { Menu, MenuModelSchema } = require('./menu.model');
const { Role, RolesModelSchema } = require('./roles.model');
const { Permission, PermissionsModelSchema } = require('./permissions.model');
const { ScheduleService, ScheduleServiceModelSchema } = require('./scheduleservice.model');
const { Service, ServicesModelSchema } = require('./services.model');
const { Schedule, SchedulesModelSchema } = require('./schedules.model');

function setUpModels(sequelize) {
  Vehicle.init(VehiclesModelSchema, Vehicle.config(sequelize));
  Role.init(RolesModelSchema, Role.config(sequelize));
  People.init(PeopleModelSchema, People.config(sequelize));
  ServicesType.init(ServicesTypesModelSchema, ServicesType.config(sequelize));
  Menu.init(MenuModelSchema, Menu.config(sequelize));
  Permission.init(PermissionsModelSchema, Permission.config(sequelize));
  Service.init(ServicesModelSchema, Service.config(sequelize));
  Schedule.init(SchedulesModelSchema, Schedule.config(sequelize));
  ScheduleService.init(ScheduleServiceModelSchema, ScheduleService.config(sequelize));

  People.associate(sequelize.models);
  Role.associate(sequelize.models);
  ServicesType.associate(sequelize.models);
  Menu.associate(sequelize.models);
  Permission.associate(sequelize.models);
  ScheduleService.associate(sequelize.models);
  Service.associate(sequelize.models);
  Schedule.associate(sequelize.models);
}

module.exports = setUpModels;
