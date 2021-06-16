import Koa from "koa";
import router from "./routes";

const app = new Koa();

app.use(router.routes());

if (require.main === module) app.listen(3000);

export default app;
