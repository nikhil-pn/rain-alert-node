const express = require("express");
const nodemailer = require("nodemailer");
const fetch = require("node-fetch");
require("dotenv").config();


const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { longUrl } = req.body;
    // const longUrl = "nikhilpn725@gmail.com";
    //weather data respone
    const data = await getWeatherData();
    for (let index = 0; index < 10; index++) {
      const weather_id = data.hourly[index].weather[0].id;
      if (weather_id < 700) {
        console.log("Bring an Umbrella");
        // Add your email sending logic heredd

        const my_email = process.env.SMTPMAIL;
        const password = process.env.PASSWORD;
        const rain_msg = "RAIN ALERT";
        const user_email = longUrl; // Make sure to replace with the actual email

        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: my_email,
            pass: password,
          },
        });

        transporter.sendMail(
          {
            from: my_email,
            to: user_email,
            subject: rain_msg,
            text: "Please take your umberalla there is a chance for rain today!\n\n",
          },
          (error, info) => {
            if (error) {
              console.error("Email sending error:", error);
            } else {
              console.log("Email sent:", info.response);
            }
          }
        );

        break; // Exit the loop if it's raining
      }
    }

    return res.status(200).json({
      status: "ok",
    });
  } catch (e) {
    console.error(e);
    return res.status(500).send(e);
  }
});

async function getWeatherData() {
  try {
    console.log("reached weather data");
    const api_key = "0e1cc6e24661f917b43a7d4c41bbe50b";
    const params = {
      lat: 9.931233,
      lon: 76.267303,
      appid: api_key,
    };

    const queryParams = new URLSearchParams(params).toString(); // Convert params to query string

    const url = `https://api.openweathermap.org/data/2.5/onecall?${queryParams}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
}

// Example usage
getWeatherData().catch((error) => console.error(error));

module.exports = router;
