import 'source-map-support/register';
import 'dotenv/config';

import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import {initMongo} from './config/mongo';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './routes';

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

  app.use('/', routes);

  app.use(function (req, res) {
    res.sendStatus(404);
  });

  app.listen(process.env.PORT || 3000);
})();

module.exports = app;
