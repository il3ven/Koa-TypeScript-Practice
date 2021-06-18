import { DefaultContext } from "koa";

export interface KoaContext extends DefaultContext {
  authorization: { username: string; password: string };
}
