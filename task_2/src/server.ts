import Koa, { DefaultContext, DefaultState } from "koa";
import authMiddleware from "./middlewares/auth";
import { KoaContext } from "./interfaces/koaContext";

const app = new Koa<DefaultState, KoaContext>();
app.use(authMiddleware);

app.use((ctx) => {
  ctx.body = `The password ${ctx.authorization.password} for ${ctx.authorization.username} is correct.`;
});

app.listen(3000);
