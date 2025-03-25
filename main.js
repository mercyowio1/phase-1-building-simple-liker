// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = "♡";
const FULL_HEART = "♥";

// Wait for the DOM to load before running the script
document.addEventListener("DOMContentLoaded", () => {
  // Add .hidden class to the error modal on page load
  const errorModal = document.getElementById("modal");
  errorModal.classList.add("hidden");

  // Select all heart elements
  const hearts = document.querySelectorAll(".like-glyph");

  // Attach event listeners to each heart
  hearts.forEach((heart) => {
    heart.addEventListener("click", () => {
      // Simulate a server request
      mimicServerCall()
        .then(() => {
          // Toggle heart state on success
          if (heart.innerText === EMPTY_HEART) {
            heart.innerText = FULL_HEART; // Change to full heart
            heart.classList.add("activated-heart"); // Make heart red
          } else {
            heart.innerText = EMPTY_HEART; // Change back to empty heart
            heart.classList.remove("activated-heart"); // Remove red color
          }
        })
        .catch((error) => {
          // Show error modal on failure
          errorModal.classList.remove("hidden");
          document.getElementById("modal-message").innerText = error;

          // Hide error modal after 3 seconds
          setTimeout(() => {
            errorModal.classList.add("hidden");
          }, 3000);
        });
    });
  });
});

//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------
function mimicServerCall(url = "http://mimicServer.example.com", config = {}) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      let isRandomFailure = Math.random() < 0.2;
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
