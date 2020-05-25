const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const db = require('./models');
const session = require('express-session')

class App {
    constructor() {
        this.app = express();

        // db 접속
        this.dbConnection();

        // 미들웨어 셋팅
        this.setMiddleWare();

        // 라우팅
        this.getRouting();

    }

    dbConnection() {
        // DB authentication
        db.sequelize.authenticate()
            .then(() => {
                console.log('Connection has been established successfully.');
            })
            .then(() => {
                console.log('DB Sync complete.');
                // return db.sequelize.sync();
            })
            .catch(err => {
                console.error('Unable to connect to the database:', err);
            });
    }

    setMiddleWare() {

        // 미들웨어 셋팅
        this.app.use(logger('dev'));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(session({
            secret: 'ambc@!vsmkv#!&*!#EDNAnsv#!$()_*#@',
            resave: false,
            saveUninitialized: true
        }));

    }

    getRouting() {
        this.app.use(require('./controllers'))
    }

}

module.exports = new App().app;