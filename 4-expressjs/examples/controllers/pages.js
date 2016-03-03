exports.index = (req, res) => {
    const data = {
        message: 'Hello, User!'
    };

    res.render('main', Object.assign(data, req.commonData));
};

exports.error404 = (req, res) => res.sendStatus(404);
