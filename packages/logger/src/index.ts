import pino from "pino";

export const logger = pino({
  name: process.env.APP_NAME as string,
  level: process.env.LOG_LEVEL || "warn",
});
