const DEFAULT_MINUTE = 25;
const DEFAULT_SECONDS = 0;

let minutes = DEFAULT_MINUTE;
let seconds = DEFAULT_SECONDS;

let timerInterval;

let start = false;
let allSoundsMuted = false;

const startButton = document.getElementById("start");
const options = document.getElementsByClassName("options");

init();
function init() {
  document.getElementById("timer").textContent = transformTimer(
    DEFAULT_MINUTE,
    0
  );
  unmuteAllAudios();
}

function updateTimer() {
  document.getElementById("timer").textContent = transformTimer(
    minutes,
    seconds
  );
}

document.getElementById("decrease").addEventListener("click", () => {
  if (isNotDefaultValuesIntervals()) {
    resetTimer();
  }

  if (minutes > 5) {
    minutes -= 5;
    updateTimer();
    playAudioClockCrank();
  }
});

document.getElementById("increase").addEventListener("click", () => {
  if (isNotDefaultValuesIntervals()) {
    resetTimer();
  }
  
  if (minutes < 120) {
    minutes += 5;
    updateTimer();
    playAudioClockCrank();
  }
});

startButton.addEventListener("click", () => {
  const isStartButton = startButton.textContent === "Start";

  if (isStartButton) {
    start = true;
    toggleDisableButtonsOfIncreaseAndDecreaseTimer();
    changeNameButtonStart("Stop");
    startButtonAction();
  } else {
    start = false;
    toggleDisableButtonsOfIncreaseAndDecreaseTimer();
    changeNameButtonStart("Start");
    stopButtonAction();
  }
});

document.getElementById("no-sound").addEventListener("click", () => {
  if (!allSoundsMuted) muteAllAudios()
  else unmuteAllAudios()

  allSoundsMuted = !allSoundsMuted
});

document.getElementById("reset").addEventListener("click", () => {
  playAudioReset()
  resetTimer()
});

function startButtonAction() {
  
  document.getElementById('audio-start').play()

  seconds = seconds === 0 ? 60 : seconds
  minutes = seconds === 60 ? --minutes : minutes

  let remainingTime = minutes * 60 + seconds

  if (remainingTime === 0) remainingTime = seconds

  togglePlayAudioClockTicking()

  timerInterval = setInterval(() => {
    if (remainingTime <= 11) {
      document.getElementById("audio-ticking").pause()
      playAudioCountdown()
    }

    if (remainingTime > 0 && start) {
      setTimerInterval();
      remainingTime--;
      updateTimer();
    } else {
      resetTimer();
      playAudioClockFinish();
    }
  }, 1000);
}

function stopButtonAction() {
  togglePlayAudioClockTicking()
  pauseAudioCountdown()
  playAudioStop()
  clearInterval(timerInterval)
}

function setTimerInterval() {
  if (seconds > 0) {
    seconds--;
  } else {
    seconds = 59;
    minutes--;
  }
}

function clearTimer() {
  minutes = DEFAULT_MINUTE;
  seconds = DEFAULT_SECONDS;
  start = false;
  toggleDisableButtonsOfIncreaseAndDecreaseTimer();
  togglePlayAudioClockTicking();
  pauseAudioCountdown();
  changeNameButtonStart("Start");
  updateTimer();
}

function transformTimer(minutes, seconds) {
  let minutesFormatted = minutes;
  let secondsFormatted = seconds;

  if (minutes < 10) {
    minutesFormatted = formatNumberOrSecond(minutes);
  }

  if (seconds < 10) {
    secondsFormatted = formatNumberOrSecond(seconds);
  }

  if (seconds === 60) {
    secondsFormatted = formatNumberOrSecond(0);
  }

  return `${minutesFormatted}:${secondsFormatted}`;
}

function formatNumberOrSecond(timer) {
  return `0${timer}`;
}

function changeNameButtonStart(text) {
  startButton.textContent = text;
}

function toggleDisableButtonsOfIncreaseAndDecreaseTimer() {
  const increaseButton = document.getElementById("increase")
  const decreaseButton = document.getElementById("decrease")

  increaseButton.disabled = !increaseButton.disabled
  decreaseButton.disabled = !decreaseButton.disabled
}

function playAudioClockFinish() {
  document.getElementById("audio-finish").play()
}

function playAudioClockCrank() {
  document.getElementById("audio-crank").play()
}

function playAudioReset() {
  document.getElementById("audio-reset").play()
}

function playAudioCountdown() {
  document.getElementById("audio-countdown").play()
}

function pauseAudioCountdown() {
  document.getElementById("audio-countdown").pause()
}

function playAudioStop() {
  document.getElementById("audio-stop").play()
}

function togglePlayAudioClockTicking() {
  const audio = document.getElementById("audio-ticking")
  audio.loop = true

  if (audio.paused && start) {
    audio.play()
  } else {
    audio.pause()
  }
}

function setVolumeAudio(id, volume) {
  document.getElementById(id).volume = volume
}

function unmuteAllAudios() {
  setVolumeAudio("audio-finish", 0.8)
  setVolumeAudio("audio-crank", 0.3)
  setVolumeAudio("audio-ticking", 0.2)
  setVolumeAudio("audio-start", 0.8)
  setVolumeAudio("audio-stop", 0.8)
  setVolumeAudio("audio-reset", 1)
}

function muteAllAudios() {
  setVolumeAudio("audio-crank", 0)
  setVolumeAudio("audio-ticking", 0)
}

function resetTimer() {
  clearInterval(timerInterval);
  clearTimer()
}

function isTimerStarted() {
  return start
}

function isNotDefaultValuesIntervals() {
  return !(minutes % 5 === 0 && seconds % 5 === 0)
}
