//Automate test code scripts for testing user actions within the application

const request = require("supertest"); // <- supertest is a testing library that simulate as a user visting web app without browser
const { app } = require("../app"); //<- load app.js (the app) here

//User can access and view the list of fragrance
test("Shopping redirects to login if not logged in", async () => {
  const res = await request(app).get("/shopping");
  expect(res.statusCode).toBe(302);
  expect(res.headers.location).toBe("/login");
});

//Users can use the search parameter in Shopping page
test("Shopping page with search parameter", async () => {
  const res = await request(app).get("/shopping?search=Lavender");
  expect(res.statusCode).toBe(302);
  expect(res.headers.location).toBe("/login");
});

// Users can add to cart requires authentication
test("Add to cart redirects to login if not logged in", async () => {
  const res = await request(app)
    .post("/add-to-cart/2")
    .send({ quantity: 1 });
  expect(res.statusCode).toBe(302);
  expect(res.headers.location).toBe("/login");
});

//Users view cart by requiring authentication if not logged in
test("Cart page redirects to login if not logged in", async () => {
  const res = await request(app).get("/cart");
  expect(res.statusCode).toBe(302);
  expect(res.headers.location).toBe("/login");
});

//Users can view fragrance details by requiring authentication if not logged in
test("Fragrance details page redirects to login if not logged in", async () => {
  const res = await request(app).get("/fragrance/2");
  expect(res.statusCode).toBe(302);
  expect(res.headers.location).toBe("/login");
});

//Users can logout successfully and be redirected to homepage
test("Logout redirects to homepage", async () => {
  const res = await request(app).get("/logout");
  expect(res.statusCode).toBe(302);
  expect(res.headers.location).toBe("/");
});