document.addEventListener("DOMContentLoaded", () => {
    const socket = io();
    const sendBtn = document.getElementById("sendBtn");
    const messageInput = document.getElementById("textarea");
    const messageArea = document.getElementById("messageArea");
  
    socket.on("chat message", (msg) => {
      const messageDiv = document.createElement("div");
      messageDiv.textContent = msg;
      messageArea.appendChild(messageDiv);
    });
  
    sendBtn.addEventListener("click", () => {
      const message = messageInput.value;
      if (message.trim() !== "") {
        socket.emit("chat message", message);
        messageInput.value = "";
      }
    });
  });
  