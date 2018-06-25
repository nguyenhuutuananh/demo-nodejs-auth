const express = require('express');
const bodyparser = require('body-parser');
const passport = require('../passport/passport');

const app = express();

// 
const expressJwt = require('express-jwt');
const authenticate = expressJwt({ secret: 'server secret' });

// Helper
const { generateToken, respond, serialize, db } = require('../helpers/helper');

app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());

// 
app.use(passport.initialize());
app.post('/auth', passport.authenticate(
    'local', {
        session: false
    }), serialize, generateToken, respond);


//

app.get('/me', authenticate, function(req, res) {
    res.status(200).json(req.user);
});

const server = app.listen(3000, function() {
    console.log('Server listening on port ' + server.address().port);
});
module.exports = app;