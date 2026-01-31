//Automate test code scripts for testing missing routes in the application

const request = require("supertest"); // <- supertest is a testing library that simulates a user visiting web app without browser
const { app } = require("../app"); //<- load app.js (the app) here

// Health check endpoint tests
test("Health endpoint returns status OK", async () => {
  const res = await request(app).get("/health");
  expect(res.statusCode).toBe(200);
  expect(res.body.status).toBe("OK");
});
