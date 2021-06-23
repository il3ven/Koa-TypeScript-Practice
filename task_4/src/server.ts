import Koa from "koa";
import router from "./routes/routes";
import { performance } from "perf_hooks";
import { KoaContext } from "./interfaces/koaContext";

const app = new Koa();

app.use(async (ctx: KoaContext, next) => {
  const t0 = performance.now();
  try {
    await next();
    const t1 = performance.now();
    ctx.body.data.factorial.timeTaken = t1 - t0;
  } catch (err) {
    ctx.status = err.status;
    ctx.type = "application/json";
    ctx.body = err.error;
    ctx.app.emit("error", err, ctx);
  }
});

app.use(router.routes());

if (require.main === module) app.listen(3000);

export default app;
