// Winston Logger

import { DefaultContext, DefaultState, Middleware } from "koa";
import { createLogger, format, transports } from "winston";

const logger = createLogger({
  format: format.combine(
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    format.json()
  ),
  transports: [
    new transports.File({
      filename: "server.log",
      silent: process.env.NODE_ENV === "test",
    }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
      silent: process.env.NODE_ENV === "test",
    })
  );
}

const loggerMiddleware: Middleware<DefaultState, DefaultContext> = (
  ctx,
  next
) => {
  ctx.logger = logger;
  next();
};

export default loggerMiddleware;
