'use strict';
const { VehiclesModelSchema, vehiclesTable } = require('../models/vehicles.model');
const { CustomersModelSchema, customersTable } = require('../models/customers.model');
const { UsersModelSchema, usersTable } = require('../models/users.model');
const { PeopleModelSchema, peopleTable } = require('../models/people.model');
const { EmployeesModelSchema, employeesTable } = require('../models/employees.model');
const { MenuModelSchema, menuTable } = require('../models/menu.model');
const { ServicesModelSchema, servicesTable } = require('../models/services.model');
const { ServicesTypesModelSchema, servicestypesTable } = require('../models/servicestypes.model');
const { RolesModelSchema, rolesTable } = require('../models/roles.model');
const { ScheduleServiceModelSchema, scheduleserviceTable } = require('../models/scheduleservice.model');
const { PermissionsModelSchema, permissionsTable } = require('../models/permissions.model');
const { SchedulesModelSchema, schedulesTable } = require('../models/schedules.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable(vehiclesTable, VehiclesModelSchema);//*
    await queryInterface.createTable(rolesTable, RolesModelSchema);//*
    await queryInterface.createTable(usersTable, UsersModelSchema); //*
    await queryInterface.createTable(peopleTable, PeopleModelSchema); //*
    await queryInterface.createTable(customersTable, CustomersModelSchema); //*
    await queryInterface.createTable(employeesTable, EmployeesModelSchema); //*
    await queryInterface.createTable(servicestypesTable, ServicesTypesModelSchema); //*
    await queryInterface.createTable(servicesTable, ServicesModelSchema); //
    await queryInterface.createTable(schedulesTable, SchedulesModelSchema); //
    await queryInterface.createTable(scheduleserviceTable, ScheduleServiceModelSchema); //
    await queryInterface.createTable(menuTable, MenuModelSchema); //*
    await queryInterface.createTable(permissionsTable, PermissionsModelSchema); //*
  },

  async down(queryInterface) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable(scheduleserviceTable);
    await queryInterface.dropTable(schedulesTable);
    await queryInterface.dropTable(servicesTable);
    await queryInterface.dropTable(servicestypesTable);
    await queryInterface.dropTable(customersTable);
    await queryInterface.dropTable(employeesTable);
    await queryInterface.dropTable(usersTable);
    await queryInterface.dropTable(peopleTable);
    await queryInterface.dropTable(permissionsTable);
    await queryInterface.dropTable(rolesTable);
    await queryInterface.dropTable(menuTable);
    await queryInterface.dropTable(vehiclesTable);
  }
};
