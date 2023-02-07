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
app.use("/api/lookup", require("./routes/lookupRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/gamelists", require("./routes/gameListRoutes"));

// ORIGINAL code when working locally
// app.get('/api', (req, res) => {
//     res.json({ message: 'Basic API response!' })
// })

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')))

    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')));
} else {
    app.get('/', (req, res) => res.send('Please set to production'));
}

app.listen(port, () => console.log(`Server started on port ${port}`));