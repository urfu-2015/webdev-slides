'use strict';

const path = require('path')

const express = require('express');
const app = express();

const morgan = require('morgan');
const bodyParser = require('body-parser');

const viewsDir = path.join(__dirname, 'views');
const publicDir = path.join(__dirname, 'public');

app.set('views', viewsDir);
app.set('view engine', 'hbs');

app.use(morgan('dev'));
app.use(express.static(publicDir));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use((err, req, res, next) => {
    console.error(err);

    next();
});

app.use((req, res, next) => {
    req.commonData = {
        meta: {
            description: 'Awesome notes',
            charset: 'utf-8',
        },
        page: {
            title: 'Awesome notes'
        }
    };

    next();
});


require('./routes')(app);

app.listen(8080, () => console.log('Listening on port 8080'));
