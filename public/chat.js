// Making the connection to the back-end through the script that we have included in HTML file
const FrontSocket = io.connect("http://localhost:4000");

// Query DOM

const message = document.getElementById("message"),
  handle = document.getElementById("handle"),
  btn = document.getElementById("send"),
  output = document.getElementById("output"),
  feedback = document.getElementById("feedback");

// EMIT Events
btn.addEventListener("click", function() {
  // This will emit(Send) the message through the socket to the backend server socket
  FrontSocket.emit("chat", {
    message: message.value,
    handle: handle.value
  }); //'chat' is simply any name we want to provide a message
});

// 'Someone is typing' broadcasting
message.addEventListener("keypress", function() {
  FrontSocket.emit("typing", handle.value);
});

// Listening for events
FrontSocket.on("chat", function(data) {
  feedback.innerHTML = "";
  output.innerHTML +=
    "<p><strong>" + data.handle + ":</strong>" + data.message + "</p>";
});

FrontSocket.on("typing", function(data) {
  feedback.innerHTML = "<p><em>" + data + " is typing a message...</em></p>";
});
