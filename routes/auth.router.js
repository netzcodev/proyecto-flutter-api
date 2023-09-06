const express = require('express');
const passport = require('passport');
const UsersService = require('../services/users.service');
const { signToken } = require('../utils/helpers/token');
const { userLogginMapper } = require('../utils/helpers/mappers/user.mapper');
const { checkStatus } = require('../middlewares/auth.handler');

const router = express.Router();
const userService = new UsersService;

// Create
router.post('/login',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      const payload = {
        sub: user.id,
        role: user.role.name
      }
      const token = signToken(payload);
      res.json(userLogginMapper({
        user,
        token
      }));
    } catch (error) {
      next(error);
    }
  }
)

router.get('/check-status',
  passport.authenticate('jwt', { session: false }),
  checkStatus,
  async (req, res, next) => {
    try {
      const user = await userService.findOne(req.user.sub);
      const payload = {
        sub: user.id,
        role: user.role.name
      }
      const token = signToken(payload);
      res.json(userLogginMapper({
        user,
        token
      }));
    } catch (error) {
      next(error);
    }
  }
)



module.exports = router;
