const MongoClient = require('mongodb').MongoClient;

const state = {
    db: null,
    url: null,
};

exports.connect = function(url, done) {
    if (state.url == url) return done();

    MongoClient.connect(url, function(err, client) {
        if (err) return done(err);
        state.db = client.db('quick-draw'); // TODO: Move this to config.ts
        state.url = url;
        done()
    })
};

exports.get = function() {
    return state.db
};

exports.close = function(done) {
    if (state.db) {
        state.db.close(function(err, result) {
            state.db = null;
            state.url = null;
            done(err)
        })
    }
};