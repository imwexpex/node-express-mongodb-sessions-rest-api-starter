require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const {initMongo} = require('./config/mongo');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

(async () => {
  await initMongo();

  if (process.env.NODE_ENV !== 'prod') {
    app.use(morgan('dev'));
  }

  app.use(
    bodyParser.json({
      limit: '20mb',
    }),
  );
  app.use(
    bodyParser.urlencoded({
      limit: '20mb',
      extended: true,
    }),
  );

  app.use(helmet());

  app.use(cors());

  app.use('/', require('./routes'));

  app.use(function (req, res) {
    res.sendStatus(404);
  });

  app.listen(process.env.PORT || 3000);
})();

module.exports = app;
