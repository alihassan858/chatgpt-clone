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
    input.value = "";

    // Loading message
    const loadingMessage = document.createElement("div");
    loadingMessage.className = "message bot-message";
    loadingMessage.innerHTML = `
        <strong>AI:</strong>
        <span>Thinking... 🤔</span>
    `;

    chatBox.appendChild(loadingMessage);
    chatBox.scrollTop = chatBox.scrollHeight;

    // Temporary AI response
    setTimeout(() => {
        loadingMessage.innerHTML = `
            <strong>AI:</strong>
            <span>Thanks for your message! 🤖</span>
        `;

        chatBox.scrollTop = chatBox.scrollHeight;

        saveChat();
    }, 1000);

    saveChat();
}

// Save chat history
function saveChat() {
    localStorage.setItem("chatHistory", chatBox.innerHTML);
}

// Load chat history
function loadChat() {
    const savedChat = localStorage.getItem("chatHistory");

    if (savedChat) {
        chatBox.innerHTML = savedChat;
    }
}

// Send button
sendButton.addEventListener("click", sendMessage);

// Enter key
input.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});

// Load previous messages
loadChat();
