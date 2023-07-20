const { app, BrowserWindow } = require('electron')

function load_window() {
  const window = new BrowserWindow({
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

startButton.addEventListener("click", function () {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(function (mediaStream) {
      stream = mediaStream;
      video.srcObject = mediaStream;
      video.play();
      startButton.disabled = true;
      stopButton.disabled = false;
    })
    .catch(function (err) {
      console.log("Error accessing webcam: " + err.message);
    });
});

stopButton.addEventListener("click", function () {
  stream.getTracks().forEach(function (track) {
    track.stop();
  });
  video.srcObject = null;
  startButton.disabled = false;
  stopButton.disabled = true;
});

// Access the webcam and set the video source
navigator.mediaDevices.getUserMedia({ video: true })
  .then(function (stream) {
    var video = document.getElementById("video");
    video.srcObject = stream;
    video.play();
  })
  .catch(function (err) {
    console.log("Error accessing webcam: " + err.message);
  });

// Get the video element and button elements by their IDs
const video = document.getElementById("video");
const playPauseButton = document.getElementById("playPauseButton");
const fullScreenButton = document.getElementById("fullScreenButton");

// Event listener for the Play/Pause button
playPauseButton.addEventListener("click", function () {
  if (video.paused) {
    video.play();
    playPauseButton.textContent = "Pause";
  } else {
    video.pause();
    playPauseButton.textContent = "Play";
  }
});

// Event listener for the Full Screen button
fullScreenButton.addEventListener("click", function () {
  if (video.requestFullscreen) {
    video.requestFullscreen();
  } else if (video.webkitRequestFullscreen) {
    video.webkitRequestFullscreen();
  }
});

 // Array to store the order items
 const orderList = [];

 // Function to add an item to the order list
 function addToOrder(item) {
   orderList.push(item);
   updateOrderList();
 }

 // Function to remove an item from the order list by index
 function removeItem(index) {
   orderList.splice(index, 1);
   updateOrderList();
 }

 // Function to update the displayed order list on the webpage
 function updateOrderList() {
   const orderListElement = document.getElementById("orderList");
   orderListElement.innerHTML = ""; // Clear the current order list display
   orderList.forEach((item, index) => {
     // Create a list item for each order item
     const listItem = document.createElement("li");
     listItem.textContent = item; // Set the text content of the list item
     const removeButton = document.createElement("button");
     removeButton.textContent = "Remove"; // Button text to remove the item
     removeButton.onclick = () => removeItem(index); // Add onclick event to remove the item
     listItem.appendChild(removeButton);
     orderListElement.appendChild(listItem); // Add the list item to the order list
   });
 }

 // Function to complete the order
 function completeOrder() {
   alert("Your Order:\n" + orderList.join("\n"));
   orderList.length = 0; // Clear the order list after completion.
   updateOrderList();
 }