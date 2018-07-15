"use strict";

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = "test";
process.env.NODE_ENV = "test";
process.env.PUBLIC_URL = "";

// Ensure environment variables are read.
require("../config/env");

const jest = require("jest");
let argv = process.argv.slice(2);

// Watch unless on CI, or explicitly running all tests
if (!process.env.CI && argv.indexOf("--watchAll") === -1) {
  argv.push("--watch");
}

argv.push("--coverage");

jest.run(argv).catch(err => {
  throw err;
});
