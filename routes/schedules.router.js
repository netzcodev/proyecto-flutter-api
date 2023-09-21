const express = require('express');
const SchedulesService = require('../services/schedules.service');
const validatorHandler = require('../middlewares/validator.handler');
const { createScheduleSchema, getScheduleSchema, addServiceSchema } = require('../schemas/schedules.schema');

const router = express.Router();
const service = new SchedulesService();

// Read
router.get('/',
  async (req, res, next) => {
    try {
      const week = req.query.week;
      const objs = await service.find(req.query, week);
      res.json(objs);
    } catch (error) {
      next(error);
    }
  }
)

// Details
router.get('/:id',
  validatorHandler(getScheduleSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const obj = await service.findOne(id);
      res.json(obj);
    } catch (error) {
      next(error);
    }
  }
)

// Create
router.post('/',
  validatorHandler(createScheduleSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const obj = await service.create(body);
      res.status(201).json(obj);
    } catch (error) {
      next(error);
    }
  }
)

// Add service
router.post('/add-service',
  validatorHandler(addServiceSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const obj = await service.addService(body);
      res.status(201).json(obj);
    } catch (error) {
      next(error);
    }
  }
)

// Update
router.patch('/:id',
  validatorHandler(getScheduleSchema, 'params'),
  // validatorHandler(updateScheduleSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const obj = await service.update(id, body);
      res.json(obj);
    } catch (error) {
      next(error);
    }
  }
)

// Delete
router.delete('/:id',
  validatorHandler(getScheduleSchema, 'params'),
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
