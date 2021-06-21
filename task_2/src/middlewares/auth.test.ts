import authMiddleware from "./auth";
import { createMockContext } from "@shopify/jest-koa-mocks";
import { KoaContext } from "../interfaces/koaContext";
import { Next } from "koa";

describe("Uni Test for Auth Middleware", () => {
  test("Should return status 401 and WWW-Authenticate when Authorization header is missing", () => {
    const mockContext = createMockContext() as KoaContext;
    mockContext.set = jest.fn();
    const next = (() => new Promise<any>((resolve) => resolve(""))) as Next;

    authMiddleware(mockContext, next);
    expect(mockContext.status).toBe(401);
    expect(mockContext.set).toBeCalledWith("WWW-Authenticate", "Basic");
  });

  test("Should call next when Authorization header is provided", () => {
    const mockContext = createMockContext({
      headers: { Authorization: "Basic YWRtaW46cGFzc3dvcmQ=" },
    }) as KoaContext;
    mockContext.set = jest.fn();
    const next = jest.fn() as Next;

    authMiddleware(mockContext, next);
    expect(next).toBeCalled();
  });
});
