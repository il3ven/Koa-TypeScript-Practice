import Koa, { DefaultState } from "koa";
import { KoaContext } from "./interfaces/KoaContext";
import loggerMiddleware from "./middlewares/logger";

const app = new Koa<DefaultState, KoaContext>();

app.use(loggerMiddleware);

app.use((ctx) => {
  ctx.body = "Hello World";
  ctx.logger.info({ message: `${ctx.method} reuest at ${ctx.url}` });
});

if (require.main === module) app.listen(3000);

export default app;
