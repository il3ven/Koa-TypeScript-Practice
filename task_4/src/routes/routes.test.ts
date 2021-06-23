import { factorialRoute, generateError } from "./routes";
import { createMockContext } from "@shopify/jest-koa-mocks";
import { KoaContext } from "../interfaces/koaContext";
import createError from "http-errors";

describe("Unit test for factorial route", () => {
  test("Should return 6 for 3! using fast method", () => {
    const ctx = createMockContext({
      url: "/api/v1/factorial/3?fast=true",
    }) as KoaContext;

    ctx.params = { number: "3" };
    factorialRoute(ctx);
    expect(ctx.status).toBe(200);
    expect(ctx.body).toEqual({
      data: {
        factorial: {
          value: 6,
          timeTaken: 0,
        },
      },
    });
  });

  test("Should return 6 for 3! using slow method", () => {
    const ctx = createMockContext({
      url: "/api/v1/factorial/3?slow=true",
    }) as KoaContext;

    ctx.params = { number: "3" };
    factorialRoute(ctx);
    expect(ctx.status).toBe(200);
    expect(ctx.body).toEqual({
      data: {
        factorial: {
          value: 6,
          timeTaken: 0,
        },
      },
    });
  });

  test("Should throw error when number > 1e8", () => {
    const ctx = createMockContext({
      url: "/api/v1/factorial/3?fast=true",
    }) as KoaContext;

    ctx.params = { number: "100000001" };
    factorialRoute(ctx);
    expect(ctx.throw).toHaveBeenCalled();
  });

  test("Should throw error when number < 1", () => {
    const ctx = createMockContext({
      url: "/api/v1/factorial/3?fast=true",
    }) as KoaContext;

    ctx.params = { number: "-1" };
    factorialRoute(ctx);
    expect(ctx.throw).toHaveBeenCalled();
  });
});
