import * as Winston from "winston";

import * as Config from "../config";

const {
  combine,
  timestamp,
  prettyPrint,
  printf,
  simple,
  colorize
} = Winston.format;

export type Logger = Winston.Logger;

const myFormat = printf(info => {
  const label = info.label ? ` [${info.label}] ` : " ";
  const msg = `${info.timestamp}${label}${info.level}: ${info.message}`;
  return msg;
});

export const newLogger = (): Logger => {
  const logger = Winston.createLogger({
    level: Config.isProduction ? "error" : "debug",
    format: combine(timestamp(), colorize(), myFormat),
    transports: [new Winston.transports.Console()]
  });

  if (!Config.isProduction) {
    //   logger.add(
    //     new Winston.transports.Console({
    //       format: Winston.format.simple()
    //     })
    //   );
    logger.debug("Logging initialized at debug level");
  }
  return logger;
};
