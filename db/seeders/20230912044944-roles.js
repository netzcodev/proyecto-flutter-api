'use strict';
const { rolesTable } = require('../models/roles.model');

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
    await queryInterface.bulkInsert(rolesTable, [
      {
        name: 'admin',
        description: 'Administrador del sistema, acceso total.',
        status: 'A',
        created_at: date,
        updated_at: date,
      },
      {
        name: 'cliente',
        description: 'Cliente, acceso limitado.',
        status: 'A',
        created_at: date,
        updated_at: date,
      },
      {
        name: 'mecanico',
        description: 'Empleado, acceso moderado',
        status: 'A',
        created_at: date,
        updated_at: date,
      },
      {
        name: 'gerente',
        description: 'Empleado, acceso avanzado',
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
    await queryInterface.bulkDelete(rolesTable, null, {});
  }
};
