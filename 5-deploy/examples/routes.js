'use strict';

const pages = require('./controllers/pages');
const notes = require('./controllers/notes');

module.exports = function (app) {
    app.get('/', pages.index);

    app.get('/notes', notes.list);
    app.post('/notes', notes.create);
    app.get('/notes/:name', notes.item);

    app.all('*', pages.error404);

    /* eslint no-unused-vars: 0 */
    /* eslint max-params: [2, 4] */
    app.use((err, req, res, next) => {
        console.error(err);

        res.sendStatus(500);
    });
};
