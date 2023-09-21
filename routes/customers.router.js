const express = require('express');
const PeopleService = require('../services/people.service');
const validatorHandler = require('../middlewares/validator.handler');
const { createPeopleSchema, updatePeopleSchema, getPeopleSchema } = require('../schemas/people.schema');
const { peopleMapper } = require('../utils/helpers/mappers/people.mapper');
const router = express.Router();
const service = new PeopleService();

// Read
router.get('/', async (req, res, next) => {
  try {
    const user = req.user;
    const { limit, offset } = req.query;

    const objs = await service.findByRole(limit, offset, 'cliente', user.sub);
    res.json(objs.map(obj => peopleMapper(obj)));
  } catch (error) {
    next(error);
  }
}
)

// Details
router.get('/:id',
  validatorHandler(getPeopleSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const obj = await service.findOneByRole(id, 'cliente');
      res.json(peopleMapper(obj));
    } catch (error) {
      next(error);
    }
  }
)

// Create
router.post('/',
  validatorHandler(createPeopleSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const obj = await service.create(body);
      res.status(201).json(peopleMapper(obj));
    } catch (error) {
      next(error);
    }
  }
)

// Update
router.patch('/:id',
  validatorHandler(getPeopleSchema, 'params'),
  validatorHandler(updatePeopleSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const obj = await service.update(id, body);
      res.json(peopleMapper(obj));
    } catch (error) {
      next(error);
    }
  }
)

// Delete
router.delete('/:id',
  validatorHandler(getPeopleSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(201).json({ id });
    } catch (error) {
      next(error);
    }
  }
)

module.exports = router;
