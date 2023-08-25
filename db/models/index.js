// este archivo se va a encargar de sincronizar e iniciar los modelos.
const { Vehicle, VehiclesModelSchema } = require('./vehicles.model');
const { User, UsersModelSchema } = require('./users.model');
const { People, PeopleModelSchema } = require('./people.model');
const { ServicesType, ServicesTypesModelSchema } = require('./servicestypes.model');
const { Employee, EmployeesModelSchema } = require('./employees.model');
const { Customer, CustomerModelSchema } = require('./customers.model');
const { Menu, MenuModelSchema } = require('./menu.model');
const { Role, RolesModelSchema } = require('./roles.model');
const { Permission, PermissionsModelSchema } = require('./permissions.model');
const { ScheduleService, ScheduleServiceModelSchema } = require('./scheduleservice.model');
const { Service, ServicesModelSchema } = require('./services.model');
const { Schedule, SchedulesModelSchema } = require('./schedules.model');

function setUpModels(sequelize) {
  Vehicle.init(VehiclesModelSchema, Vehicle.config(sequelize));
  User.init(UsersModelSchema, User.config(sequelize));
  People.init(PeopleModelSchema, People.config(sequelize));
  ServicesType.init(ServicesTypesModelSchema, ServicesType.config(sequelize));
  Customer.init(CustomerModelSchema, Customer.config(sequelize));
  Employee.init(EmployeesModelSchema, Employee.config(sequelize));
  Menu.init(MenuModelSchema, Menu.config(sequelize));
  Role.init(RolesModelSchema, Role.config(sequelize));
  Permission.init(PermissionsModelSchema, Permission.config(sequelize));
  Service.init(ServicesModelSchema, Service.config(sequelize));
  Schedule.init(SchedulesModelSchema, Schedule.config(sequelize));
  ScheduleService.init(ScheduleServiceModelSchema, ScheduleService.config(sequelize));

  Customer.associate(sequelize.models);
  Employee.associate(sequelize.models);
  People.associate(sequelize.models);
  User.associate(sequelize.models);
  ServicesType.associate(sequelize.models);
  Menu.associate(sequelize.models);
  Role.associate(sequelize.models);
  Permission.associate(sequelize.models);
  ScheduleService.associate(sequelize.models);
  Service.associate(sequelize.models);
  Schedule.associate(sequelize.models);
}

module.exports = setUpModels;
