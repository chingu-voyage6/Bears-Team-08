import * as Bcrypt from "bcrypt-nodejs";
import * as Mongoose from "mongoose";
import * as Config from "../config";
import { UserJSON } from "@shared/user";
import { MongoDB } from "../lib/database";

export type UserDocument = Mongoose.Document &
  UserJSON & {
    password: string;
    passwordResetToken: string;
    passwordResetExpires: Date;
    comparePassword: comparePasswordFunc;
  };

type comparePasswordFunc = (
  pass: string,
  cb: (err: any, isMatch: boolean) => any
) => void;

export type AuthToken = {
  accessToken: string;
  kind: string;
};

export const userSchema = new Mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, unique: true },
    password: String,
    passwordResetToken: String,
    passwordResetExpires: Date,

    tokens: Array
  },
  {}
);

userSchema.pre("save", function save(next) {
  const user = this as UserDocument;
  if (!user.isModified("password")) {
    return next();
  }
  Bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    Bcrypt.hash(user.password, salt, undefined, (e: Mongoose.Error, hash) => {
      if (e) {
        return next(e);
      }
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(pass, cb) {
  Bcrypt.compare(
    pass,
    this.password,
    (err: Mongoose.Error, isMatch: boolean) => {
      cb(err, isMatch);
    }
  );
};

export const createUserModel = (db: MongoDB) =>
  db.createModel("User", userSchema);
