import loggerMiddleware from "./logger";
import { createMockContext } from "@shopify/jest-koa-mocks";

describe("Unit test for logger middleware", () => {
  test("Should attach logger to context", () => {
    const ctx = createMockContext();
    const next = () => new Promise(() => {});

    loggerMiddleware(ctx, next);
    expect(ctx.logger).toBeDefined();
  });
});
