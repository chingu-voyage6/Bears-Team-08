const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GithubStrategy = require('passport-github').Strategy;

passport.use(new LocalStrategy(
    {
        usernameField: 'username',
        passwordField: 'password'
    },
    function(username, password, done) {
        // TODO: Search DB for user
        if (username == 'test' && password == 'test') {
            return done(null, {username: 'test'});
        } else {
            return done(null, false, { message: 'Error' });
        }
    }
));

// TODO: Get rid of this
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

router.get('/auth', function (req, res) {
    if (req.user) {
        res.json({ message: "Welcome, " + req.user.username });
    } else {
        res.json({ message: "Welcome, please login"});
    }
});

router.post("/auth/local",
    passport.authenticate('local'),
    function (req, res) {
        res.redirect('/api/user/auth');
        // res.json({ message: "Welcome, " + req.user.username });
    });

module.exports = router;