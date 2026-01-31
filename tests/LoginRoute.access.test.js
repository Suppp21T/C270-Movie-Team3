//Automate test code scripts for testing login functionality within the application

const request = require("supertest"); // <- supertest is a testing library that simulates a user visiting web app without browser
const app = require("../app"); //<- load app.js (main app) here

//Users can access login page
test("Login page is accessible", async () => {  // <- " " = text description | async = wait for responses
  const res = await request(app).get("/login"); // <- GET login page and wait for responses
  expect(res.statusCode).toBe(200); // <- expected result
});

//Admin can successfully login with valid credentials
test("Admin user can successfully login", async () => {
  const res = await request(app)
    .post("/login")
    .send({
      email: "yxtadmin@gmail.com",
      password: "password321"
    });
  // Expect redirect to inventory page for admin
  expect(res.statusCode).toBe(302);
  expect(res.header.location).toBe("/inventory");
});

//Normal users can successfully login with valid credentials
test("Regular user can successfully login", async () => {
  const res = await request(app)
    .post("/login")
    .send({
      email: "yxt@gmail.com",
      password: "password321"
    });
  // Expect redirect to shopping page for regular user
  expect(res.statusCode).toBe(302);
  expect(res.header.location).toBe("/shopping");
});

//Users login fails with missing email
test("Login fails when email is missing", async () => {
  const res = await request(app)
    .post("/login")
    .send({
      password: "password321"
    });
  // Expect redirect to login page for all users
  expect(res.statusCode).toBe(302);
  expect(res.header.location).toBe("/login");
});

//User login fails with missing password
test("Login fails when password is missing", async () => {
  const res = await request(app)
    .post("/login")
    .send({
      email: "yxt@gmail.com"
    });
  // Expect redirect to login page for all users
  expect(res.statusCode).toBe(302);
  expect(res.header.location).toBe("/login");
});

//User login fails with invalid email
test("Login fails with invalid email", async () => {
  const res = await request(app)
    .post("/login")
    .send({
      email: "invalidemail@gmail.com",
      password: "password321"
    });
  // Expect redirect to login page for all users
  expect(res.statusCode).toBe(302);
  expect(res.header.location).toBe("/login");
});

//User login fails with incorrect password
test("Login fails with incorrect password", async () => {
  const res = await request(app)
    .post("/login")
    .send({
      email: "yxt@gmail.com",
      password: "wrongpassword"
    });
  // Expect redirect to login page for all users
  expect(res.statusCode).toBe(302); // <- redirect back to login
  expect(res.header.location).toBe("/login");
});

//User login fails when both email and password are empty
test("Login fails when both fields are empty", async () => {
  const res = await request(app)
    .post("/login")
    .send({
      email: "",
      password: ""
    });
  // Expect redirect to login page for all users
  expect(res.statusCode).toBe(302); // <- redirect back to login
  expect(res.header.location).toBe("/login");
});
