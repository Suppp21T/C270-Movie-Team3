// Start server for localhost browser testing

const app = require("./app"); //<- load app.js (the app) here

const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});