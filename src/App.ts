import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import * as cors from 'cors';
//import HeroRouter from './routes/HeroRouter';
import * as mongoose from 'mongoose';
import UserRoute from './routes/UsersRoute';
import participate from './routes/ParticipateRoute';
import { request } from 'https';
import { error } from 'util';
var config = require('./config').get(process.env.NODE_ENV);


const MONGO_URI = config.database;
// Creates and configures an ExpressJS web server.
class App {

  // ref to Express instance
  public express: express.Application;

  //Run configuration methods on the Express instance.
  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
    mongoose.connect(MONGO_URI || process.env.MONGODB_URI);
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(logger('dev'));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.use(helmet());
    this.express.use(cors());
  }

  // Configure API endpoints.
  private routes(): void {
    /* This is just to get up and running, and to make sure what we've got is
     * working so far. This function will change when we start to add more
     * API endpoints */
    let router = express.Router();
    // placeholder route handler
    router.get('/', (req, res, next) => {
      res.json({
        message: 'Hello World!'
      });
    });
    this.express.use('/', router);
    this.express.use('/Users',UserRoute);
    this.express.use('/participate', participate);
    this.express.use((req, res, next) => {
      const err = new error();
      err.message = 'not found';
      err.status = 404;
      next(err);
    });
    this.express.use((error, req, res, next) => {
      res.status(error.status || 500);
      res.json({
      err:
        {
          message: error.message,
          status:error.status
        }
      });
    });

  }

}

export default new App().express;
