"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");
//import HeroRouter from './routes/HeroRouter';
const mongoose = require("mongoose");
const UsersRoute_1 = require("./routes/UsersRoute");
const ParticipateRoute_1 = require("./routes/ParticipateRoute");
const util_1 = require("util");
var config = require('./config').get(process.env.NODE_ENV);
const MONGO_URI = config.database;
// Creates and configures an ExpressJS web server.
class App {
    //Run configuration methods on the Express instance.
    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
        mongoose.connect(MONGO_URI || process.env.MONGODB_URI);
    }
    // Configure Express middleware.
    middleware() {
        this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use(helmet());
        this.express.use(cors());
    }
    // Configure API endpoints.
    routes() {
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
        this.express.use('/Users', UsersRoute_1.default);
        this.express.use('/participate', ParticipateRoute_1.default);
        this.express.use((req, res, next) => {
            const err = new util_1.error();
            err.message = 'not found';
            err.status = 404;
            next(err);
        });
        this.express.use((error, req, res, next) => {
            res.status(error.status || 500);
            res.json({
                err: {
                    message: error.message,
                    status: error.status
                }
            });
        });
    }
}
exports.default = new App().express;
