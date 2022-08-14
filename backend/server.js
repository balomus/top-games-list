const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;

connectDB();

const app = express();

// These two middleware enable us to parse json and urlencoded responses on API calls
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/authenticate", require("./routes/authenticationRoutes"));
app.use("/api/accessToken", require("./routes/accessTokenRoutes"));

app.get('/api', (req, res) => {
    res.json({ message: 'Basic API response!' })
    // res.json({ message: 'response!' });
})

app.listen(port, () => console.log(`Server started on port ${port}`));