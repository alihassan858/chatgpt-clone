// Static ChatGPT Clone
// This project is a non-functional UI design.

const sendButton = document.querySelector(".send-button");
const messageInput = document.querySelector(".input-area input");

sendButton.addEventListener("click", function () {
    // The button is intentionally non-functional.
    console.log("Send button clicked.");
});

messageInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        // The interface is static, so no message is sent.
        console.log("Enter key pressed.");
    }
});
