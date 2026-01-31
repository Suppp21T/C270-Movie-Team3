//Automate test code scripts for testing login functionality within the application

const request = require("supertest"); // <- supertest is a testing library that simulates a user visiting web app without browser
const app = require("../app"); //<- load app.js (main app) here

// Test 1: Users can access login page (GET)
test("Login page is accessible", async () => {  // <- " " = text description | async = wait for responses
  const res = await request(app).get("/login"); // <- GET login page and wait for responses
  expect(res.statusCode).toBe(200); // <- expected result
});

// Test 2: Login page renders login.ejs
test("Login page renders login view", async () => {
  const res = await request(app).get("/login");
  expect(res.text).toContain("login"); // <- check if login content is rendered
});

// Test 3: Successful login with valid credentials (admin)
test("Admin user can successfully login", async () => {
  const res = await request(app)
    .post("/login")
    .send({
      email: "admin@example.com",
      password: "password123"
    });
  
  // Expect redirect to inventory page for admin
  expect(res.statusCode).toBe(302); // <- 302 = redirect
  expect(res.header.location).toBe("/inventory");
});

// Test 4: Successful login with valid credentials (regular user)
test("Regular user can successfully login", async () => {
  const res = await request(app)
    .post("/login")
    .send({
      email: "user@example.com",
      password: "password123"
    });
  
  // Expect redirect to shopping page for regular user
  expect(res.statusCode).toBe(302); // <- 302 = redirect
  expect(res.header.location).toBe("/shopping");
});

// Test 5: Login fails with missing email
test("Login fails when email is missing", async () => {
  const res = await request(app)
    .post("/login")
    .send({
      password: "password123"
    });
  
  expect(res.statusCode).toBe(302); // <- redirect back to login
  expect(res.header.location).toBe("/login");
});

// Test 6: Login fails with missing password
test("Login fails when password is missing", async () => {
  const res = await request(app)
    .post("/login")
    .send({
      email: "user@example.com"
    });
  
  expect(res.statusCode).toBe(302); // <- redirect back to login
  expect(res.header.location).toBe("/login");
});

// Test 7: Login fails with invalid email
test("Login fails with invalid email", async () => {
  const res = await request(app)
    .post("/login")
    .send({
      email: "invalidemail@example.com",
      password: "password123"
    });
  
  expect(res.statusCode).toBe(302); // <- redirect back to login
  expect(res.header.location).toBe("/login");
});

// Test 8: Login fails with incorrect password
test("Login fails with incorrect password", async () => {
  const res = await request(app)
    .post("/login")
    .send({
      email: "user@example.com",
      password: "wrongpassword"
    });
  
  expect(res.statusCode).toBe(302); // <- redirect back to login
  expect(res.header.location).toBe("/login");
});

// Test 9: Login fails when both email and password are empty
test("Login fails when both fields are empty", async () => {
  const res = await request(app)
    .post("/login")
    .send({
      email: "",
      password: ""
    });
  
  expect(res.statusCode).toBe(302); // <- redirect back to login
  expect(res.header.location).toBe("/login");
});
