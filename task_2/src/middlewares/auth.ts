import { Next } from "koa";
import { KoaContext } from "../interfaces/koaContext";

const authMiddleware = async (ctx: KoaContext, next: Next) => {
  if (ctx.request.header.authorization) {
    const bufferObj = Buffer.from(
      ctx.request.header.authorization.split(" ")[1],
      "base64"
    );
    const [username, password] = bufferObj.toString("utf-8").split(":");
    ctx.authorization = { username, password };
    await next();
  } else {
    ctx.set("WWW-Authenticate", "Basic");
    ctx.status = 401;
  }
};

export default authMiddleware;
