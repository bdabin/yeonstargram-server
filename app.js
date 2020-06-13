const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const db = require('./models');

//passport 로그인 관련
const passport = require('passport');
const session = require('express-session');

class App {
    constructor() {
        this.app = express();

        // db 접속
        this.dbConnection();

        // 세션 셋팅
        this.setSession();

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


    setSession() {

        const SequelizeStore = require('connect-session-sequelize')(session.Store);

        this.app.sessionMiddleWare = session({
            secret: 'fwafwakln21@$!*!@%',
            resave: false,
            saveUninitialized: true,
            cookie: {
                maxAge: 2000 * 60 * 60 //지속시간 2시간
            },
            // 세션 DB 저장
            store: new SequelizeStore({
                db: db.sequelize,
            }),
        });
        this.app.use(this.app.sessionMiddleWare);

    }

    setMiddleWare() {

        // 미들웨어 셋팅
        this.app.use(logger('dev'));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));

        //passport 적용
        this.app.use(passport.initialize());
        this.app.use(passport.session());

    }

    getRouting() {
        this.app.use(require('./controllers'))
    }

}

module.exports = new App().app;