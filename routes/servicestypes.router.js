const express = require('express');
const ServicesTypesService = require('../services/servicestypes.service');
const validatorHandler = require('../middlewares/validator.handler');
const { createServicesTypeSchema, getServicesTypeSchema, updateServicesTypeSchema } = require('../schemas/servicestypes.schema');

const router = express.Router();
const service = new ServicesTypesService();

// Read
router.get('/', async (req, res, next) => {
  try {
    const objs = await service.find();
    res.json(objs);
  } catch (error) {
    next(error);
  }
}
)

// Details
router.get('/:id',
  validatorHandler(getServicesTypeSchema, 'params'),
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
  validatorHandler(createServicesTypeSchema, 'body'),
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

// Update
router.patch('/:id',
  validatorHandler(getServicesTypeSchema, 'params'),
  validatorHandler(updateServicesTypeSchema, 'body'),
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
  validatorHandler(getServicesTypeSchema, 'params'),
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
