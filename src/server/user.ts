import * as express from "express";
import * as passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GithubStrategy } from "passport-github";
import * as jwt from "jsonwebtoken";
import { merge } from "lodash";

import * as Config from "./config";
import * as db from "./db";

passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password"
    },
    async (username, password, done): Promise<void> => {
      const users = await db.get().collection("users");
      const user = await users.findOne({ username });

      if (user) {
        if (user.password === password) {
          // TODO: Encrypt the password
          delete user.password;
          done(null, user);
          return Promise.resolve();
        } else {
          done(null, false);
          return Promise.resolve();
        }
      } else {
        const user = { username, password }; // TODO: Encrypt the password
        await users.insertOne(user);
        delete user.password;
        done(null, user);
        return Promise.resolve();
      }
    }
  )
);

// TODO: Get rid of this
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

export interface JWTPayload {
  username: string;
}

function issueJWT(params: JWTPayload, options?: jwt.SignOptions): string {
  if (options && options.expiresIn === 0) {
    delete options.expiresIn;
  } else {
    const expiresIn = Config.isProduction ? "15m" : "1h";
    options = merge({ expiresIn }, options);
  }
  try {
    return jwt.sign({ username: params.username }, Config.secretKey, options);
  } catch (err) {
    throw new Error(`Unable to issue token for ${params.username}: ${err}`);
  }
}

export function verifyToken(token: string): JWTPayload {
  return jwt.verify(token, Config.secretKey) as JWTPayload;
}

export async function authenticateJWT(
  req: express.Request,
  res: express.Response
): Promise<String | null> {
  const header = req.headers.authorization || null;
  if (header) {
    const token = header.toString().replace("Bearer ", "");
    try {
      const { username } = verifyToken(token);
      const users = await db.get().collection("users");
      const user = await users.findOne({ username });
      delete user.password;
      return user;
    } catch (err) {
      throw err;
    }
  } else {
    throw "Miss Token";
  }
}

export const userRouter = express.Router();

userRouter.get("/auth", (req, res) => {
  authenticateJWT(req, res)
    .then(function(user) {
      res.json({ user });
    })
    .catch(function(err) {
      res.json({ err });
    });
});

userRouter.post(
  "/auth/local",
  passport.authenticate("local", { failureFlash: true }),
  (req, res) => {
    const token = issueJWT({ username: req.user.username });

    res.json({ token });
  }
);
