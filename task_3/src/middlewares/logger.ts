// Winston Logger

import { DefaultState, Middleware } from "koa";
import { createLogger, format, transports } from "winston";
import { KoaContext } from "../interfaces/KoaContext";

const logger = createLogger({
  format: format.combine(
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    format.json()
  ),
  transports: [new transports.File({ filename: "server.log" })],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
    })
  );
}

const loggerMiddleware: Middleware<DefaultState, KoaContext> = (ctx, next) => {
  ctx.logger = logger;
  next();
};

export default loggerMiddleware;
