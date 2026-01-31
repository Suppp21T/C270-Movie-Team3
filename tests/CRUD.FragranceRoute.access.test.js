//Automate test code scripts for testing user actions within the application

const request = require("supertest"); // <- supertest is a testing library that simulate as a user visting web app without browser
const { app } = require("../app"); //<- load app.js (main app) here

//Adding fragrance requires authentication and admin role
test("AddFragrance redirects to login if not logged in", async () => {
  const res = await request(app).get("/addFragrance");
  expect(res.statusCode).toBe(302);
  expect(res.headers.location).toBe("/login");
});

test("AddFragrance POST redirects to login if not logged in", async () => {
  const res = await request(app)
    .post("/addFragrance")
    .send({
      name: "Test Fragrance",
      quantity: 10,
      price: 99.99,
      description: "A test fragrance",
      imageUrl: "http://example.com/image.jpg"
    });
  expect(res.statusCode).toBe(302);
  expect(res.headers.location).toBe("/login");
});

//Updating fragrance requires authentication and admin role
test("UpdateFragrance redirects to login if not logged in", async () => {
  const res = await request(app).get("/updateFragrance/2");
  expect(res.statusCode).toBe(302);
  expect(res.headers.location).toBe("/login");
});

test("UpdateFragrance POST redirects to login if not logged in", async () => {
  const res = await request(app)
    .post("/updateFragrance/1")
    .send({
      name: "Updated Fragrance",
      quantity: 20,
      price: 149.99,
      description: "An updated fragrance",
      imageUrl: "http://example.com/updated.jpg",
      currentImage: "http://example.com/image.jpg"
    });
  expect(res.statusCode).toBe(302);
  expect(res.headers.location).toBe("/login");
});

//Delete fragrance requires authentication and admin role
test("DeleteFragrance redirects to login if not logged in", async () => {
  const res = await request(app)
    .post("/deleteFragrance/2");
  expect(res.statusCode).toBe(302);
  expect(res.headers.location).toBe("/login");
});