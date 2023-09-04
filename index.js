const express = require('express');
const routerApi = require('./routes');
const cors = require('cors');
const { config } = require('./config/config');
const { errorHandler, logError, boomErrorHandler, ormErrorHandler } = require('./middlewares/error.handler');

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
