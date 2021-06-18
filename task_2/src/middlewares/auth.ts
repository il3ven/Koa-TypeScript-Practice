import { Middleware, Next, DefaultContext, ParameterizedContext } from "koa";

interface MiddlewareContext extends DefaultContext {
  authorization: string;
}

const authMiddleware: Middleware<MiddlewareContext, Next> = async (
  ctx,
  next
) => {
  if (ctx.request.header.authorization) {
    const bufferObj = Buffer.from(
      ctx.request.header.authorization.split(" ")[1],
      "base64"
    );
    const [username, password] = bufferObj.toString("utf-8").split(":");
    ctx.authorization = "as";
    await next();
  } else {
    ctx.set("WWW-Authenticate", "Basic");
    ctx.status = 401;
  }
};

export default authMiddleware;
