const express = require('express');
const { getFirebaseAccessToken, sendPushNotification } = require('../services/firebase.service');
// const PeopleService = require('../services/people.service');

const router = express.Router();
// const peopleService = new PeopleService;

// Read
router.post('/', async (req, res, next) => {
  try {
    const objs = await getFirebaseAccessToken();
    // const user = await peopleService.findOne(req.user.sub);

    const response = await sendPushNotification(objs, req.body.token);
    res.json(response);
  } catch (error) {
    next(error);
  }
}
)

module.exports = router;
