'use strict';
const { VehiclesModelSchema, vehiclesTable } = require('../models/vehicles.model');
const { PeopleModelSchema, peopleTable } = require('../models/people.model');
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
    await queryInterface.createTable(menuTable, MenuModelSchema); //*
    await queryInterface.createTable(rolesTable, RolesModelSchema);//*
    await queryInterface.createTable(permissionsTable, PermissionsModelSchema); //*
    await queryInterface.createTable(peopleTable, PeopleModelSchema); //*
    await queryInterface.createTable(vehiclesTable, VehiclesModelSchema);//*
    await queryInterface.createTable(servicestypesTable, ServicesTypesModelSchema); //*
    await queryInterface.createTable(servicesTable, ServicesModelSchema); //
    await queryInterface.createTable(schedulesTable, SchedulesModelSchema); //
    await queryInterface.createTable(scheduleserviceTable, ScheduleServiceModelSchema); //
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
    await queryInterface.dropTable(vehiclesTable);
    await queryInterface.dropTable(servicestypesTable);
    await queryInterface.dropTable(permissionsTable);
    await queryInterface.dropTable(menuTable);
    await queryInterface.dropTable(peopleTable);
    await queryInterface.dropTable(rolesTable);
  }
};
