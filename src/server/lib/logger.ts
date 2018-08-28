import * as pino from "pino";

import { isProduction } from "../config";

export type Logger = pino.Logger;
export type LoggerOptions = pino.LoggerOptions & { [key: string]: any };

export function newLogger(options?: LoggerOptions): Logger {
  return pino({ level: !isProduction ? "info" : "debug", ...options });
}

export const baseLogger = newLogger();
