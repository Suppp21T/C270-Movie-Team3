//Automate test code scripts for testing user actions within the application

const request = require("supertest");
const { app } = require("../app");

//User can acccess registering page
test("Register page is accessible", async () => {
  const res = await request(app).get("/register");
  expect(res.statusCode).toBe(200);
});

//Registering fails when required fields are missing
test("Registering fails when fields are missing", async () => {
  const res = await request(app)
    .post("/register")
    .send({ username: "testuser" });
  expect(res.statusCode).toBe(400);
});