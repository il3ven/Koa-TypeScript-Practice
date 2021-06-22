import Koa, { DefaultState } from "koa";
import authMiddleware from "./middlewares/auth";
import { KoaContext } from "./interfaces/koaContext";

const app = new Koa<DefaultState, KoaContext>();
app.use(authMiddleware);

app.use((ctx) => {
  ctx.body = `The password ${ctx.authorization?.password} for ${ctx.authorization?.username} is correct.`;
});

if (require.main === module) app.listen(3000);

export default app;
