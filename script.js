const input = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");
const chatBox = document.getElementById("chat-box");

function sendMessage() {
    const message = input.value.trim();

    if (message === "") {
        return;
    }

    // User message
    const userMessage = document.createElement("div");
    userMessage.className = "message user-message";

    userMessage.innerHTML = `
        <strong>You:</strong>
        <span>${message}</span>
    `;

    chatBox.appendChild(userMessage);

    // Clear input box
    input.value = "";

    // Temporary AI reply
    setTimeout(() => {

        const botMessage = document.createElement("div");
        botMessage.className = "message bot-message";

        botMessage.innerHTML = `
            <strong>AI:</strong>
            <span>Thanks for your message! 🤖</span>
        `;

        chatBox.appendChild(botMessage);

        // Automatically scroll down
        chatBox.scrollTop = chatBox.scrollHeight;

    }, 500);

    // Scroll down
    chatBox.scrollTop = chatBox.scrollHeight;
}


// Send button
sendButton.addEventListener("click", sendMessage);


// Press Enter to send
input.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        sendMessage();
    }

});
