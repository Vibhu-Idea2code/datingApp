document.addEventListener("DOMContentLoaded", () => {
    const socket = io();
    const sendBtn = document.getElementById("sendBtn");
    const messageInput = document.getElementById("message");
    const allMessages = document.getElementById("messages");
  
    socket.on("message", (message) => {
      const p = document.createElement("p");
      p.innerHTML = message;
      allMessages.appendChild(p);
    });
  
    sendBtn.addEventListener("click", () => {
      const message = messageInput.value;
      const user = "User"; // You can replace this with the actual user from your database
      if (message.trim() !== "") {
        socket.emit("user-message", { user, text: message });
        messageInput.value = "";
      }
    });
  });
  