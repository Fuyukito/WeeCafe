const { app, BrowserWindow } = require('electron')

function load_window () {
    const window = new BrowserWindow ({
        width: 800,
        height: 600,
    })
    window.loadFile('src/index.html')
}

app.whenReady().then(load_window)

var video = document.getElementById("video");
var startButton = document.getElementById("start-button");
var stopButton = document.getElementById("stop-button");

var stream;

startButton.addEventListener("click", function() {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(function(mediaStream) {
      stream = mediaStream;
      video.srcObject = mediaStream;
      video.play();
      startButton.disabled = true;
      stopButton.disabled = false;
    })
    .catch(function(err) {
      console.log("Error accessing webcam: " + err.message);
    });
});

stopButton.addEventListener("click", function() {
  stream.getTracks().forEach(function(track) {
    track.stop();
  });
  video.srcObject = null;
  startButton.disabled = false;
  stopButton.disabled = true;
});

const orderList = [];

function addToOrder(item) {
  orderList.push(item);
  updateOrderList();
}

function removeItem(index) {
  orderList.splice(index, 1);
  updateOrderList();
}

function updateOrderList() {
  const orderListElement = document.getElementById("orderList");
  orderListElement.innerHTML = "";
  orderList.forEach((item, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = item;
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.onclick = () => removeItem(index);
    listItem.appendChild(removeButton);
    orderListElement.appendChild(listItem);
  });
}

function completeOrder() {
  // Implement your logic to process the complete order, e.g., submit to the server.
  // For now, we will simply alert the order items.
  alert("Your Order:\n" + orderList.join("\n"));
  orderList.length = 0; // Clear the order list after completion.
  updateOrderList();
}
}
