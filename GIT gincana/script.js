document.addEventListener("DOMContentLoaded", function () {
        const startButtons = document.querySelectorAll(".start-button");
        const resetButtons = document.querySelectorAll(".reset-button");

        startButtons.forEach((button, index) => {
          const display = button.parentElement.querySelector(".display");
          let timer;
          let seconds = 0;
          let isRunning = false;

          button.addEventListener("click", function () {
            if (!isRunning) {
              isRunning = true;
              button.textContent = "Parar";
              timer = setInterval(() => {
                seconds++;
                const formattedTime = formatTime(seconds);
                display.textContent = formattedTime;
              }, 1000);
            } else {
              isRunning = false;
              button.textContent = "Iniciar";
              clearInterval(timer);
            }
          });

          resetButtons[index].addEventListener("click", function () {
            clearInterval(timer);
            seconds = 0;
            display.textContent = formatTime(seconds);
            startButtons[index].textContent = "Iniciar";
            isRunning = false;
          });
        });

        function formatTime(seconds) {
          const hours = Math.floor(seconds / 3600);
          const minutes = Math.floor((seconds % 3600) / 60);
          const secs = seconds % 60;
          return `${pad(hours)}:${pad(minutes)}:${pad(secs)}`;
        }

        function pad(number) {
          return (number < 10 ? "0" : "") + number;
        }
      });

      let hours = 0;
let minutes = 0;
let seconds = 0;
let interval = null;
let isRunning = false;

function startStopTimer() {
    if (!isRunning) {
        interval = setInterval(updateTimer, 1000);
        document.getElementById('startStopButton').textContent = "Parar";
        isRunning = true;
    } else {
        clearInterval(interval);
        document.getElementById('startStopButton').textContent = "Iniciar";
        isRunning = false;
    }
}

function resetTimer() {
    clearInterval(interval);
    hours = 0;
    minutes = 0;
    seconds = 0;
    isRunning = false;
    document.getElementById('display').textContent = "00:00:00";
    document.getElementById('startStopButton').textContent = "Iniciar";
}

function updateTimer() {
    seconds++;
    if (seconds === 60) {
        seconds = 0;
        minutes++;
        if (minutes === 60) {
            minutes = 0;
            hours++;
        }
    }
    
    document.getElementById('display').textContent = formatTime(hours, minutes, seconds);
}

function formatTime(hours, minutes, seconds) {
    return (
        String(hours).padStart(2, '0') + ':' +
        String(minutes).padStart(2, '0') + ':' +
        String(seconds).padStart(2, '0')
    );
}