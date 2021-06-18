import Koa from "koa";
import authMiddleware from "./middlewares/auth";

const app = new Koa();
app.use(authMiddleware);

app.use((ctx) => {
  ctx.body = "You are authorized";
});

app.listen(3000);
