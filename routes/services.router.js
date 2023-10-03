const express = require('express');
const ServicesService = require('../services/services.service');
const validatorHandler = require('../middlewares/validator.handler');
const { serivceMapper } = require('../utils/helpers/mappers/service.mapper');
const { createServicesSchema, getServicesSchema, updateServicesSchema } = require('../schemas/services.schema');

const router = express.Router();
const service = new ServicesService();

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

router.get('/dashboard', async (req, res, next) => {
  try {
    const { id, limit, offset } = req.query;
    const objs = await service.findHistory(id, limit, offset);
    res.json(objs.map(element => serivceMapper(element)));
  } catch (error) {
    next(error);
  }
}
)

router.get('/coming', async (req, res, next) => {
  try {
    const { id } = req.query;
    const objs = await service.findComingService(id);

    res.json(objs.map(element => serivceMapper(element)));
  } catch (error) {
    next(error);
  }
}
)

router.get('/report', async (req, res, next) => {
  try {
    const filename = `reporte-${Date.now()}-${2}`;

    const stream = res.writeHead(200, {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment;filename=${filename}.pdf`
    });

    await service.generatePdfReport(
      req.user.sub,
      (chunk) => stream.write(chunk),
      () => stream.end()
    );
  } catch (error) {
    next(error);
  }
}
)

// Details
router.get('/:id',
  validatorHandler(getServicesSchema, 'params'),
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
  validatorHandler(createServicesSchema, 'body'),
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
  validatorHandler(getServicesSchema, 'params'),
  validatorHandler(updateServicesSchema, 'body'),
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
  validatorHandler(getServicesSchema, 'params'),
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
