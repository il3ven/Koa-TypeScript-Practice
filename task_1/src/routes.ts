import Router from "@koa/router";
import { ParameterizedContext } from "koa";

const router = new Router();

const hello = async (ctx: ParameterizedContext) => {
  ctx.response.body = "World";
};

const echo = async (ctx: ParameterizedContext) => {
  ctx.type = "application/json";
  ctx.body = JSON.stringify(ctx.query);
};

const error = async (ctx: ParameterizedContext) => {
  ctx.throw(500, "Internal Server Error");
};

router.get("/hello", hello);
router.get("/echo", echo);
router.get("/error", error);

export default router;
export { hello, echo, error }; // For testing purposes
