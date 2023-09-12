'use strict';
const { peopleTable } = require('../models/people.model');

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
    await queryInterface.bulkInsert(peopleTable, [
      {
        document: 1102382123,
        name: 'Admin',
        last_name: 'Almeida',
        email: 'admin@mail.com',
        password: '$2a$10$DPNjQNaajksXXTK05YcZX.sa831GIoQjZDdti74q39rfpNepr1zEa',
        status: 'A',
        role_id: 1,
        created_at: date,
        updated_at: date,
      },
      {
        document: 123456789,
        name: 'Cliente',
        last_name: 'Diaz',
        email: 'cliente@mail.com',
        password: '$2a$10$DPNjQNaajksXXTK05YcZX.sa831GIoQjZDdti74q39rfpNepr1zEa',
        status: 'A',
        role_id: 2,
        created_at: date,
        updated_at: date,
      },
      {
        document: 987654321,
        name: 'Mecanico',
        last_name: 'Ochoa',
        email: 'mecanico@mail.com',
        password: '$2a$10$DPNjQNaajksXXTK05YcZX.sa831GIoQjZDdti74q39rfpNepr1zEa',
        status: 'A',
        role_id: 3,
        created_at: date,
        updated_at: date,
      },
      {
        document: 987654328,
        name: 'Gerente',
        last_name: 'Barrios',
        email: 'gerente@mail.com',
        password: '$2a$10$DPNjQNaajksXXTK05YcZX.sa831GIoQjZDdti74q39rfpNepr1zEa',
        status: 'A',
        role_id: 4,
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
    await queryInterface.bulkDelete(peopleTable, null, {});
  }
};
