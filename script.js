let initialStyles = [];
let animationStarted = false;
let pausedStyles = [];

document.getElementById("startBtn").addEventListener("click", startTimer);
document.getElementById("resetBtn").addEventListener("click", resetTimer);
document.getElementById("stopBtn").addEventListener("click", stopTimer);

function startTimer() {
  document.getElementById("startBtn").disabled = true;
  document.querySelectorAll(".line").forEach((line, index) => {
    line.style.animation = "moveLine 3s infinite alternate";
    line.style.animationDelay = Math.random() * 2 + "s";

    if (!pausedStyles[index]) {
      initialStyles[index] = window
        .getComputedStyle(line)
        .getPropertyValue("transform");
    }

    if (pausedStyles[index]) {
      line.style.transform = pausedStyles[index].transform;
      line.style.animationPlayState = "running";
    }
  });
  animationStarted = true;
  document.getElementById("stopBtn").disabled = false;
}

function resetTimer() {
  document.querySelectorAll(".line").forEach((line, index) => {
    line.style.animation = "none";
    line.style.animationPlayState = "initial";
    if (initialStyles[index]) {
      line.style.transform = initialStyles[index]; // Restore initial position
    }
  });
  pausedStyles = []; // Reset pausedStyles array
  animationStarted = false;
  document.getElementById("stopBtn").disabled = true;
  document.getElementById("startBtn").disabled = false;
}

function stopTimer() {
  if (animationStarted) {
    document.querySelectorAll(".line").forEach((line, index) => {
      line.style.animationPlayState = "paused";
      pausedStyles[index] = {
        transform: window.getComputedStyle(line).getPropertyValue("transform"),
      };
    });
  }
  document.getElementById("startBtn").disabled = false;
}
