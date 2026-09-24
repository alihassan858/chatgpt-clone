const input = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");
const clearButton = document.getElementById("clear-button");
const chatBox = document.getElementById("chat-box");

const BACKEND_URL = "https://chatgpt-clone-production-9381.up.railway.app";

function getTime() {
    return new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });
}

async function sendMessage() {
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

    try {
        const response = await fetch(BACKEND_URL + "/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: message
            })
        });

        const data = await response.json();

        loadingMessage.innerHTML = `
            <strong>AI:</strong>
            <span>${data.reply}</span>
            <small>${getTime()}</small>
        `;

    } catch (error) {
        loadingMessage.innerHTML = `
            <strong>AI:</strong>
            <span>❌ Backend connection error.</span>
            <small>${getTime()}</small>
        `;

        console.error(error);
    }

    chatBox.scrollTop = chatBox.scrollHeight;
    saveChat();
}

// Save chat
function saveChat() {
    localStorage.setItem("chatHistory", chatBox.innerHTML);
}

// Load chat
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

loadChat();
