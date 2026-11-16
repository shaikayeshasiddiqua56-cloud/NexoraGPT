// HTML Elements

const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const micBtn = document.getElementById("micBtn");
const languageSelect = document.getElementById("languageSelect");

const micStatus = document.getElementById("micStatus");
const chatMessages = document.getElementById("chatMessages");

const welcomeSection = document.getElementById("welcomeSection");
const suggestions = document.getElementById("suggestions");

const newChatBtn = document.getElementById("newChatBtn");
const historyList = document.getElementById("historyList");

const settingsBtn = document.getElementById("settingsBtn");
const profileBtn = document.getElementById("profileBtn");


// Chat History

let chats = [];
let currentChatId = null;
let chatCounter = 1;


// Create a new chat

function createNewChat() {

    const chat = {
        id: chatCounter++,
        title: "New Chat",
        messages: []
    };

    chats.unshift(chat);
    currentChatId = chat.id;

    renderHistory();
    renderMessages();

    userInput.value = "";
    micStatus.textContent = "";

    return chat;
}


// Display recent chats

function renderHistory() {

    historyList.innerHTML = "";

    chats.forEach(function (chat) {

        const item = document.createElement("p");

        item.className = "history-item";

        if (chat.id === currentChatId) {
            item.classList.add("active");
        }

        item.textContent = "💬 " + chat.title;

        item.addEventListener("click", function () {
            currentChatId = chat.id;
            renderHistory();
            renderMessages();
        });

        historyList.appendChild(item);

    });

}


// Display messages

function renderMessages() {

    chatMessages.innerHTML = "";

    const currentChat = chats.find(
        chat => chat.id === currentChatId
    );

    if (!currentChat || currentChat.messages.length === 0) {

        welcomeSection.style.display = "block";
        suggestions.style.display = "grid";

    } else {

        welcomeSection.style.display = "none";
        suggestions.style.display = "none";

        currentChat.messages.forEach(function (message) {
            addMessage(message.text, message.sender);
        });

    }

}


// Add message to screen and history

function addMessage(message, sender) {

    const messageDiv = document.createElement("div");

    messageDiv.classList.add("message");

    if (sender === "user") {
        messageDiv.classList.add("user-message");
    } else {
        messageDiv.classList.add("bot-message");
    }

    messageDiv.textContent = message;

    chatMessages.appendChild(messageDiv);

    chatMessages.scrollTop = chatMessages.scrollHeight;
}


// Predefined chatbot responses

function getBotResponse(message) {

    const text = message.toLowerCase();

    if (text.includes("hello") || text.includes("hi")) {
        return "Hello! 👋 Welcome to NexoraGPT. How can I help you?";
    }

    if (text.includes("idea")) {
        return "Here are some creative ideas:\n\n1. Learn a new skill.\n2. Build a small project.\n3. Read a useful book.\n4. Explore creative hobbies. 💡";
    }

    if (text.includes("learn") || text.includes("teach")) {
        return "Learning becomes easy when you divide a topic into small parts. Start with the basics and practise every day! 📚";
    }

    if (text.includes("code") || text.includes("program")) {
        return "I can help with basic programming concepts. Java, Python, HTML, CSS and JavaScript are great skills to practise! 💻";
    }

    if (text.includes("english") || text.includes("writing")) {
        return "To improve your English, read daily, learn new words and practise speaking. Don't be afraid of making mistakes! ✨";
    }

    if (text.includes("thank")) {
        return "You're welcome! Happy to help you. ❤️";
    }

    if (text.includes("who are you") || text.includes("your name")) {
        return "I'm NexoraGPT, your personal virtual assistant! ✿";
    }

    if (text.includes("time")) {
        return "You can check the current time on your device. ⏰";
    }

    return "That's an interesting question! 😊 I'm a basic chatbot with predefined responses. Try asking about ideas, learning, programming or English.";
}


// Send Message

function sendMessage() {

    const message = userInput.value.trim();

    if (message === "") {
        return;
    }

    if (!currentChatId) {
        createNewChat();
    }

    const currentChat = chats.find(
        chat => chat.id === currentChatId
    );

    currentChat.messages.push({
        text: message,
        sender: "user"
    });

    if (currentChat.title === "New Chat") {
        currentChat.title = message.slice(0, 22);
    }

    userInput.value = "";

    renderHistory();
    renderMessages();

    setTimeout(function () {

        const response = getBotResponse(message);

        currentChat.messages.push({
            text: response,
            sender: "bot"
        });

        if (currentChatId === currentChat.id) {
            renderMessages();
        }

    }, 500);

}


// Send Button

sendBtn.addEventListener("click", sendMessage);


// Enter Key

userInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        sendMessage();
    }

});


// New Chat Button

newChatBtn.addEventListener("click", function () {
    createNewChat();
});


// Logo - Home Button

document.getElementById("homeBtn").addEventListener("click", function () {

    if (!currentChatId) {
        createNewChat();
    }

    currentChatId = null;

    renderHistory();
    renderMessages();

});


// Suggestion Cards

document.querySelectorAll(".suggestion-card").forEach(function (card) {

    card.addEventListener("click", function () {

        userInput.value = card.dataset.prompt;

        sendMessage();

    });

});


// Online Status

document.getElementById("onlineStatus").addEventListener("click", function () {
    alert("NexoraGPT frontend assistant is available! ✿");
});


// Settings Popup

settingsBtn.addEventListener("click", function () {

    document.getElementById("settingsPopup").style.display = "flex";

});


// Profile Popup

profileBtn.addEventListener("click", function () {

    document.getElementById("profilePopup").style.display = "flex";

});


// Close Popups

document.querySelectorAll("[data-close]").forEach(function (button) {

    button.addEventListener("click", function () {

        document.getElementById(button.dataset.close).style.display = "none";

    });

});


// Close popup by clicking outside

document.querySelectorAll(".popup-overlay").forEach(function (popup) {

    popup.addEventListener("click", function (event) {

        if (event.target === popup) {
            popup.style.display = "none";
        }

    });

});


// Profile

const profileName = document.getElementById("profileName");
const profileMessage = document.getElementById("profileMessage");

let savedName = "";

document.getElementById("saveProfile").addEventListener("click", function () {

    const name = profileName.value.trim();

    if (name === "") {
        profileMessage.textContent = "Please enter your name.";
        return;
    }

    savedName = name;

    document.querySelector(".welcome-section h1").textContent =
        "Hello, " + savedName + "! 👋";

    profileMessage.textContent =
        "Profile saved successfully! ❤️";

});


// Settings

const darkModeToggle = document.getElementById("darkModeToggle");
const settingsLanguage = document.getElementById("settingsLanguage");

document.getElementById("saveSettings").addEventListener("click", function () {

    document.body.classList.toggle(
        "dark-mode",
        darkModeToggle.checked
    );

    languageSelect.value = settingsLanguage.value;

    document.getElementById("settingsMessage").textContent =
        "Settings saved successfully! ❤️";

});


// Microphone Feature

const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition;
let isListening = false;

if (SpeechRecognition) {

    recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;

    micBtn.addEventListener("click", function () {

        if (isListening) {
            recognition.stop();
            return;
        }

        recognition.lang = languageSelect.value;

        try {
            recognition.start();
        } catch (error) {
            micStatus.textContent =
                "Please wait a moment and try again.";
        }

    });


    recognition.onstart = function () {

        isListening = true;

        micBtn.classList.add("listening");

        micStatus.textContent =
            "🎤 Listening... Speak now!";

    };


    recognition.onresult = function (event) {

        const transcript =
            event.results[0][0].transcript;

        userInput.value = transcript;

        micStatus.textContent =
            "Speech converted to text! Click Send.";

    };


    recognition.onerror = function (event) {

        micStatus.textContent =
            "Microphone error: " + event.error;

    };


    recognition.onend = function () {

        isListening = false;

        micBtn.classList.remove("listening");

    };

} else {

    micBtn.disabled = true;

    micStatus.textContent =
        "Speech recognition is not supported. Please try Google Chrome.";

}


// Start with a fresh chat

createNewChat();
