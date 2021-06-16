import { hello, echo, error } from "./routes";
import { createMockContext } from "@shopify/jest-koa-mocks";

describe("Unit Test: Task 1", () => {
  test("GET /hello", () => {
    const ctx = createMockContext();
    hello(ctx);
    expect(ctx.body).toBe("World");
  });

  test("GET /echo", () => {
    const ctx = createMockContext({ url: "/?hello=world" });
    echo(ctx);
    expect(ctx.type).toEqual("application/json");
    expect(ctx.body).toEqual(JSON.stringify({ hello: "world" }));
  });

  test("GET /error", async () => {
    const ctx = createMockContext();
    await error(ctx);
    expect(ctx.throw).toHaveBeenCalledWith(500, "Internal Server Error");
  });
});
