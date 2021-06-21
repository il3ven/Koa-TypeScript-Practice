import { ParameterizedContext } from "koa";

export interface KoaContext extends ParameterizedContext {
  authorization?: { username: string; password: string };
}
