import Koa from "koa";
import Router from "@koa/router";

const app = new Koa();
const router = new Router();

router.get("/hello", async (ctx) => {
  ctx.response.body = "World";
});

router.get("/echo", async (ctx) => {
  ctx.type = "application/json";
  ctx.body = JSON.stringify(ctx.query);
});

router.get("/error", async (ctx) => {
  ctx.throw(500, "Internal Server Error");
});

app.use(router.routes());

app.listen(3000);
