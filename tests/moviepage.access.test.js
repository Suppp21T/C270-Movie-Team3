//Automate test code scripts for testing user actions within the application

const request = require("supertest"); // <- supertest is a testing library that simulate as a user visting web app without browser
const app = require("../app"); //<- load app.js (main app) here

//User can view the list of movies
test.skip("Movie list page is accessible", async() => {
    const res = await request(app).get("/movies");
    expect(res.statusCode).toBe(200);
}); 
