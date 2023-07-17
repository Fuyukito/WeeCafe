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