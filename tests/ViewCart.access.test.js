//Automate test code scripts for testing user actions within the application

const request = require("supertest"); // <- supertest is a testing library that simulate as a user visting web app without browser
const { app } = require("../app"); //<- load app.js (main app) here

//User can access and view their cart
test("Cart page is accessible", async () => {
  const res = await request(app).get("/cart");
  expect(res.statusCode).toBe(302);
  expect(res.headers.location).toBe("/login");
});