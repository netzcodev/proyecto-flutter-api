'use strict';
const { permissionsTable } = require('../models/permissions.model');

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
    await queryInterface.bulkInsert(permissionsTable, [
      {
        // admin
        role_id: 1,
        menu_id: 1,
        add: 1,
        read: 1,
        modify: 1,
        remove: 1,
        created_at: date,
        updated_at: date,
      },
      {
        role_id: 1,
        menu_id: 2,
        add: 1,
        read: 1,
        modify: 1,
        remove: 1,
        created_at: date,
        updated_at: date,
      },
      {
        role_id: 1,
        menu_id: 3,
        add: 1,
        read: 1,
        modify: 1,
        remove: 1,
        created_at: date,
        updated_at: date,
      },
      {
        role_id: 1,
        menu_id: 4,
        add: 1,
        read: 1,
        modify: 1,
        remove: 1,
        created_at: date,
        updated_at: date,
      },
      {
        role_id: 1,
        menu_id: 5,
        add: 1,
        read: 1,
        modify: 1,
        remove: 1,
        created_at: date,
        updated_at: date,
      },
      {
        role_id: 1,
        menu_id: 6,
        add: 1,
        read: 1,
        modify: 1,
        remove: 1,
        created_at: date,
        updated_at: date,
      },
      {
        role_id: 1,
        menu_id: 7,
        add: 1,
        read: 1,
        modify: 1,
        remove: 1,
        created_at: date,
        updated_at: date,
      },
      {
        role_id: 1,
        menu_id: 8,
        add: 1,
        read: 1,
        modify: 1,
        remove: 1,
        created_at: date,
        updated_at: date,
      },
      // Gerente
      {
        role_id: 4,
        menu_id: 5,
        add: 1,
        read: 1,
        modify: 1,
        remove: 1,
        created_at: date,
        updated_at: date,
      },
      {
        role_id: 4,
        menu_id: 4,
        add: 1,
        read: 1,
        modify: 1,
        remove: 0,
        created_at: date,
        updated_at: date,
      },
      {
        role_id: 4,
        menu_id: 3,
        add: 0,
        read: 1,
        modify: 0,
        remove: 0,
        created_at: date,
        updated_at: date,
      },
      {
        role_id: 4,
        menu_id: 2,
        add: 0,
        read: 1,
        modify: 0,
        remove: 0,
        created_at: date,
        updated_at: date,
      },
      // Mecanico
      {
        role_id: 3,
        menu_id: 6,
        add: 1,
        read: 1,
        modify: 1,
        remove: 1,
        created_at: date,
        updated_at: date,
      },
      {
        role_id: 3,
        menu_id: 7,
        add: 1,
        read: 1,
        modify: 1,
        remove: 1,
        created_at: date,
        updated_at: date,
      },
      {
        role_id: 3,
        menu_id: 2,
        add: 0,
        read: 1,
        modify: 0,
        remove: 0,
        created_at: date,
        updated_at: date,
      },
      {
        role_id: 3,
        menu_id: 3,
        add: 0,
        read: 1,
        modify: 0,
        remove: 0,
        created_at: date,
        updated_at: date,
      },
      // Cliente
      {
        role_id: 2,
        menu_id: 8,
        add: 1,
        read: 1,
        modify: 1,
        remove: 1,
        created_at: date,
        updated_at: date,
      },
      {
        role_id: 2,
        menu_id: 1,
        add: 0,
        read: 1,
        modify: 0,
        remove: 0,
        created_at: date,
        updated_at: date,
      },
      {
        role_id: 2,
        menu_id: 2,
        add: 0,
        read: 1,
        modify: 0,
        remove: 0,
        created_at: date,
        updated_at: date,
      },
      {
        role_id: 2,
        menu_id: 6,
        add: 0,
        read: 1,
        modify: 1,
        remove: 0,
        created_at: date,
        updated_at: date,
      },
      {
        role_id: 2,
        menu_id: 7,
        add: 0,
        read: 1,
        modify: 0,
        remove: 0,
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
    await queryInterface.bulkDelete(permissionsTable, null, {});
  }
};
