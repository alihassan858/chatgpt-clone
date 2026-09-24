const input = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");
const clearButton = document.getElementById("clear-button");
const chatBox = document.getElementById("chat-box");

function getTime() {
    const now = new Date();

    return now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });
}

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
        <small>${getTime()}</small>
    `;

    chatBox.appendChild(userMessage);
    input.value = "";

    // Thinking message
    const loadingMessage = document.createElement("div");
    loadingMessage.className = "message bot-message";

    loadingMessage.innerHTML = `
        <strong>AI:</strong>
        <span>Thinking... 🤔</span>
        <small>${getTime()}</small>
    `;

    chatBox.appendChild(loadingMessage);
    chatBox.scrollTop = chatBox.scrollHeight;

    saveChat();

    // Temporary AI response
    setTimeout(() => {
        loadingMessage.innerHTML = `
            <strong>AI:</strong>
            <span>Thanks for your message! 🤖</span>
            <small>${getTime()}</small>
        `;

        chatBox.scrollTop = chatBox.scrollHeight;

        saveChat();
    }, 1000);
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

// Clear chat
clearButton.addEventListener("click", function() {
    localStorage.removeItem("chatHistory");

    chatBox.innerHTML = `
        <div class="message bot-message">
            <strong>AI:</strong>
            <span>Hello! 👋 How can I help you?</span>
            <small>${getTime()}</small>
        </div>
    `;
});

// Send button
sendButton.addEventListener("click", sendMessage);

// Enter key
input.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});

// Load previous chat
loadChat();
