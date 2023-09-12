'use strict';
const { servicestypesTable } = require('../models/servicestypes.model');

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
    await queryInterface.bulkInsert(servicestypesTable, [
      {
        name: 'mantenimiento',
        description: 'mantenimiento',
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
    await queryInterface.bulkDelete(servicestypesTable, null, {});
  }
};
