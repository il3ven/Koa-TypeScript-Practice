import app from "./server";
import supertest from "supertest";

const server = app.listen();
const request = supertest.agent(server);

process.env.NODE_ENV = "testing";

afterAll(() => {
  server.close();
});

describe("Integration test of server", () => {
  test("Should return status 200 and text", (done) => {
    request.get("/").expect(200, (err, res) => {
      if (err) done(err);
      expect(res.text).toBe("Hello World");
      done();
    });
  });
});
