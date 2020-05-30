const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const db = require('./models');
const session = require('express-session');

//... 후략


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
                return db.sequelize.sync();
                // return db.sequelize.drop();
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
            saveUninitialized: true,
            cookie: {
                maxAge: 2000 * 60 * 60 // 지속시간 2시간
            }
        }));

    }

    getRouting() {

        this.app.use(require('./controllers'))
    }

}

module.exports = new App().app;