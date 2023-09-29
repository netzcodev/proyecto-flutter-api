const express = require('express');
const VehiclesService = require('../services/vehicles.service');
const validatorHandler = require('../middlewares/validator.handler');
const { createVehicleSchema, getVehicleSchema, updateVehicleSchema } = require('../schemas/vehicles.schema');
const { getFirebaseAccessToken, sendPushNotification } = require('../services/firebase.service');

const router = express.Router();
const service = new VehiclesService();

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
  validatorHandler(getVehicleSchema, 'params'),
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
  validatorHandler(createVehicleSchema, 'body'),
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
  validatorHandler(getVehicleSchema, 'params'),
  validatorHandler(updateVehicleSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const obj = await service.update(id, body);
      console.log(obj.notificationFlag, obj.notificationType);
      if (req.user.role == 'cliente' && obj.notificationFlag) {
        console.log('entro a hacer el envío de la push');
        const accessToken = await getFirebaseAccessToken();
        await sendPushNotification(
          accessToken,
          req.body.firebaseToken,
          obj.notificationType,
          obj.response.dataValues.plate
        );
      }
      res.json(obj.response);
    } catch (error) {
      next(error);
    }
  }
)

// Delete
router.delete('/:id',
  validatorHandler(getVehicleSchema, 'params'),
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
