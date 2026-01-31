//Automate test code scripts for testing user actions within the application

const request = require("supertest"); // <- supertest is a testing library that simulate as a user visting web app without browser
const app = require("../app"); //<- load app.js (main app) here

//User can acccess and view fragrance details
test("Shopping redirects to login if not logged in", async () => {
  const res = await request(app).get("/fragrance/2");
  expect(res.statusCode).toBe(302);
  expect(res.headers.location).toBe("/login");
});