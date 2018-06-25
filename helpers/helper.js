const jwt = require('jsonwebtoken');
const helper = {};

helper.generateToken = (req, res, next) => {
    req.token = jwt.sign({
        id: req.user.id,
    }, 'server secret', {
        // expiresInMinutes: 120
    });
    next();
};

helper.respond = (req, res) => {
    res.status(200).json({
        user: req.user,
        token: req.token
    });
};

helper.serialize = (req, res, next) => {
    console.log('what?');
    helper.db.updateOrCreate(req.user, function(err, user) {
        if (err) {
            return next(err);
        }
        // we store the updated information in req.user again
        req.user = {
            id: user.id
        };
        next();
    });
};

// DB
helper.db = {
    updateOrCreate: function(user, cb) {
        // db dummy, we just cb the user
        cb(null, user);
    }
};
module.exports = helper;