const argv = process.argv.slice(2);

const isClient = argv[2] === "client";
const isServer = argv[2] === "server";

const cwd = process.cwd();

const jestConfig = {
  verbose: true,
  setupFiles: ["<rootDir>/lib/polyfills.ts", "<rootDir>/lib/testSetup.ts"],
  testURL: "http://localhost",
  testRegex: "\\.(spec|test)\\.(js|ts)x?$",
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  transformIgnorePatterns: ["[/\\\\]node_modules[/\\\\].+\\.(js|ts)x?$"],
  moduleNameMapper: {
    "^.+\\.(css|less)$": "identity-obj-proxy",
    "shared/.*": `${cwd}/src/$0`
  },
  moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json", "node"],
  // testEnvironment: "./lib/mongoEnvironment.js",
  // globalSetup: "./lib/globalTestSetup.js",
  // globalTeardown: "./lib/globalTestTeardown.js",
  globals: {
    "ts-jest": {
      tsConfigFile: "<rootDir>/config/tsconfig.test.json"
    }
  }
};

module.exports = jestConfig;
