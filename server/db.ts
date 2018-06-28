import { MongoClient } from "mongodb";

const state = {
  db: null,
  url: null
};

export const connect = async (url: string): Promise<void> => {
  if (state.url === url) return Promise.resolve();
  const client = await MongoClient.connect(url);
  state.db = await client.db("quick-draw");
  state.url = url;
};

export const get = () => {
  return state.db;
};

export const close = done => {
  if (state.db) {
    state.db.close((err, result) => {
      state.db = null;
      state.url = null;
      done(err);
    });
  }
};
