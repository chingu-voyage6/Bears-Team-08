const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GithubStrategy = require('passport-github').Strategy;
const db = require('./db');

passport.use(new LocalStrategy(
    {
        usernameField: 'username',
        passwordField: 'password'
    },
    function(username, password, done) {
        const users = db.get().collection('users');

        users.findOne({username: username}, function(err, res) {
            if (err) throw err;

            if (res) {
                if (res.password == password) {
                    return done(null, res);
                }

                return done(null, false);
            } else {
                const user = {username: username, password: password}; // TODO: Encrypt the password

                users.insertOne(user, function(err, res) {
                    if (err) throw err;

                    return done(null, user);
                });
            }

        });
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
    passport.authenticate('local', { failureFlash: true }),
    function (req, res) {
        res.json({ message: "Welcome, " + req.user.username });
    });

module.exports = router;