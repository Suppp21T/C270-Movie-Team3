//Automate test code scripts for testing user actions within the application

const request = require("supertest"); // <- supertest is a testing library that simulate as a user visting web app without browser
const { app } = require("../app"); //<- load app.js (main app) here

// Inventory requires authentication (redirects to login)
test("Inventory redirects to login if not logged in", async () => {
  const res = await request(app).get("/inventory");
  expect(res.statusCode).toBe(302);
  expect(res.headers.location).toBe("/login");
});
