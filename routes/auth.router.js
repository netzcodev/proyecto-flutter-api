const express = require('express');
const passport = require('passport');
const { signToken } = require('../utils/helpers/token');

const router = express.Router();

// Create
router.post('/login',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      const payload = {
        sub: user.id,
        role: user.role
      }
      delete user.password;
      const token = signToken(payload);
      res.json({
        user,
        token
      });
    } catch (error) {
      next(error);
    }
  }
)



module.exports = router;
