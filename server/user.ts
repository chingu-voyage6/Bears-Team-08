import * as express from 'express';
import * as passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as GithubStrategy } from "passport-github";

import * as db from "./db";

passport.use(new LocalStrategy(
    {
        usernameField: 'username',
        passwordField: 'password'
    },
    async (username, password, done): Promise<void> => {
        const users = await db.get().collection('users');
        const user = await users.findOne({ username });

        if (user) {
            if (user.password === password) { // TODO: Encrypt the password
                done(null, user);
                return Promise.resolve()
            } else {
                done(null, false);
                return Promise.resolve()
            }

        } else {
            const user = {username, password}; // TODO: Encrypt the password
            await users.insertOne(user);
            done(null, user);
            return Promise.resolve()
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

const router = express.Router();

router.get('/auth', (req, res) => {
    if (req.user) {
        res.json({ message: "Welcome, " + req.user.username });
    } else {
        res.json({ message: "Welcome, please login"});
    }
});

router.post("/auth/local",
    passport.authenticate('local', { failureFlash: true }),
    (req, res) => {
        res.json({ message: "Welcome, " + req.user.username });
    });

module.exports = router;