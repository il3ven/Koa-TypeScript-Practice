import { DefaultContext } from "koa";
import { Logger } from "winston";

export interface KoaContext extends DefaultContext {
  logger: Logger;
}
