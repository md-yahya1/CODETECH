const chatBox = document.getElementById("chatBox");

function loadMessages() {
    chatBox.innerHTML = "";
    let messages = JSON.parse(localStorage.getItem("chatMessages")) || [];

    messages.forEach(msg => {
        const div = document.createElement("div");
        div.classList.add("message");
        div.innerHTML = `<strong>${msg.user}:</strong> ${msg.text}`;
        chatBox.appendChild(div);
    });

    chatBox.scrollTop = chatBox.scrollHeight;
}

function sendMessage() {
    const user = document.getElementById("username").value.trim();
    const text = document.getElementById("message").value.trim();

    if (!user || !text) return;

    let messages = JSON.parse(localStorage.getItem("chatMessages")) || [];

    messages.push({
        user: user,
        text: text,
        time: new Date().toLocaleTimeString()
    });

    localStorage.setItem("chatMessages", JSON.stringify(messages));
    document.getElementById("message").value = "";

    loadMessages();
}

// Auto refresh chat (real-time feel)
setInterval(loadMessages, 1000);

// Load previous messages on page load
loadMessages();
