import * as Mongoose from "mongoose";

const connectToDatabase = (url: string): Promise<Mongoose.Mongoose> => {
  return Mongoose.connect(url);
};

// const const newDatabase(): Promise<Mongoose.Mongoose> => {
// return Mongoose.connect();
// }
