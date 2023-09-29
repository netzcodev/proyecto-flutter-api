const { config } = require('./config/config');
const { errorHandler, logError, boomErrorHandler, ormErrorHandler } = require('./middlewares/error.handler');
const admin = require("firebase-admin");
const cors = require('cors');
const express = require('express');
const routerApi = require('./routes');
const serviceAccount = require("./firebase-admin.json");

const app = express();
const port = config.port;
const host = config.host;
const whitelist = ['http://localhost:3000/', 'http://localhost:*'];

const options = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed'));
    }
  }
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

app.use(express.json());
app.use(cors(options));
require('./utils/auth');
routerApi(app);
app.use(logError);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, host, () => {
  console.log(`Listen on port:${port}, host:${host}`);
});
