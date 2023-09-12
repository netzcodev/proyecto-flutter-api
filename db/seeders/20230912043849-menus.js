'use strict';
const { menuTable } = require('../models/menu.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const date = new Date();

    await queryInterface.bulkInsert(menuTable, [
      {
        name: 'Dashboard',
        description: 'Visualización de información',
        status: 'A',
        created_at: date,
        updated_at: date,
      },
      {
        name: 'Calendar',
        description: 'Visualización de calendario',
        status: 'A',
        created_at: date,
        updated_at: date,
      },
      {
        name: 'Customers',
        description: 'Gestion de clientes',
        status: 'A',
        created_at: date,
        updated_at: date,
      },
      {
        name: 'Employees',
        description: 'Gestion de empleados',
        status: 'A',
        created_at: date,
        updated_at: date,
      },
      {
        name: 'People',
        description: 'Gestion de personas, usuarios.',
        status: 'A',
        created_at: date,
        updated_at: date,
      },
      {
        name: 'Schedules',
        description: 'Gestion de citas',
        status: 'A',
        created_at: date,
        updated_at: date,
      },
      {
        name: 'Services',
        description: 'Gestion de servicios',
        status: 'A',
        created_at: date,
        updated_at: date,
      },
      {
        name: 'Vehicles',
        description: 'Gestion de vehiculos',
        status: 'A',
        created_at: date,
        updated_at: date,
      },
    ]);
  },

  async down(queryInterface) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete(menuTable, null, {});
  }
};
