module.exports = async function() {
  try {
    // await global.__MONGOD__.stop();
  } catch (e) {
    console.log("rawr", e);
  }
};
