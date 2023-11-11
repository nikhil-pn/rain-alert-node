// console.log("emailSubmit.js loaded");

// document.querySelector("form").addEventListener("submit", function (event) {
//   event.preventDefault();

//   // Get the email input element from the HTML form
//   const emailInput = document.getElementById("email-input");

//   // Store the email input value in a variable
//   const email = emailInput.value;
//   console.log(email, "EMAIL");


// });
console.log("emailSubmit.js loaded");

document.querySelector("form").addEventListener("submit", async function (event) {
  event.preventDefault();

  // Get the email input element from the HTML form
  const emailInput = document.getElementById("email-input");

  // Store the email input value in a variable
  const email = emailInput.value;
  console.log(email, "EMAIL");

  const yourApiUrl = "http://localhost:5001/urlapi"; // Replace with your actual URL

  try {
    const response = await axios.post(
      yourApiUrl,
      {
        longUrl: email,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Response from the server:", response.data);
    // You can add further logic to handle the response as needed
  } catch (error) {
    console.error("Error sending POST request:", error.message);
    // You can add further error handling logic here
  }
});
