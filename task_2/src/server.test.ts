import app from "./server";
import supertest from "supertest";

const server = app.listen();
const request = supertest.agent(server);

afterAll(() => {
  server.close();
});

describe("Integration test for server", () => {
  test("Should return 401 when Authorization header is missing", (done) => {
    request.get("/").expect(401, (err, res) => {
      if (err) done(err);

      expect(res.headers["www-authenticate"]).toBe("Basic");
      done();
    });
  });

  test("Should return 200 when Authorization header is present", (done) => {
    request
      .get("/")
      .auth("admin", "pass")
      .expect(200, (err, res) => {
        if (err) done(err);

        expect(res.text).toBe("The password pass for admin is correct.");
        done();
      });
  });
});
