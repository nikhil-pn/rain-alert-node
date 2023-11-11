const express = require("express");
const cors = require("cors"); // Import the cors middleware
const app = express();
const shortUrl = require("./routes/url");

// Middleware functions that are called before calling the API endpoint
app.use(cors()); // Use cors middleware to enable CORS
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.use("/urlapi", shortUrl);

app.use(
  cors({
    origin: "*", // Allow any origin
    optionsSuccessStatus: 200,
  })
);

const PORT = 5001;
app.listen(PORT, () => {
  console.log("App is running on the Port =", PORT);
});
