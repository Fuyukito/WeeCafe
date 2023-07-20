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