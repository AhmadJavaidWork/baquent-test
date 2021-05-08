import express from 'express';
import forceSSL from 'express-force-ssl';
import cors from 'cors';
import compression from 'compression';
import morgan from 'morgan';
import { env } from '../../config';
import knex from '../knex';

export default (apiRoot, routes) => {
  const app = express();
  app.use('db', knex);

  if (env === 'production') {
    app.set('forceSSLOptions', {
      enable301Redirects: false,
      trustXFPHeader: true,
    });
    app.use(forceSSL);
  }

  /* istanbul ignore next */
  if (env === 'production' || env === 'development') {
    app.use(compression());
    app.use(morgan('dev'));
  }
  if (env === 'production') {
    app.use(
      cors({
        credentials: true,
        origin: 'https://eatos.herokuapp.com',
      })
    );
  } else {
    app.use(cors({ credentials: true, origin: 'http://localhost:8080' }));
  }
  app.use(apiRoot, routes);

  return app;
};
