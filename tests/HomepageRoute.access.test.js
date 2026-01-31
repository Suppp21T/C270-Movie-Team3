//Automate test code scripts for testing user actions within the application

const request = require("supertest"); // <- supertest is a testing library that simulate as a user visting web app without browser
const { app } = require("../app"); //<- load app.js (main app) here

//Users can access homepage
test("Homepage is accessible", async () => {  // <- " " = text description | async = wait for responses
  const res = await request(app).get("/"); // <- GET homepage and wait for responses
  expect(res.statusCode).toBe(200); // <-expected result
});