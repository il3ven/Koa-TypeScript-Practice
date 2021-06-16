import app from "./index";
import supertest from "supertest";

const server = app.listen();
const request = supertest.agent(server);

describe("Task 1", () => {
  afterAll(() => {
    server.close();
  });

  test("GET /hello should return world", (done) => {
    request.get("/hello").expect(200, (err, res) => {
      if (err) done(err);

      expect(res.text).toBe("World");
      done();
    });
  });

  test("GET /echo should return query params", (done) => {
    request
      .get("/echo?hello=world")
      .expect("Content-Type", /json/)
      .expect(200, (err, res) => {
        if (err) done(err);

        expect(res.body).toEqual({ hello: "world" });
        done();
      });
  });
});
