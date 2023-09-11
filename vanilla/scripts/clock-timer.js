(function () { 
  const MIN_MINUTE = 5
  const MAX_MINUTE = 60
  const INCREASE_DEFAULT = 5

  const DEFAULT_MINUTE = 0
  const DEFAULT_SECONDS = 5

  let minutes = DEFAULT_MINUTE
  let seconds = DEFAULT_SECONDS
  let timerInterval
  let start = false

  const startButton = document.getElementById("start")

  function init() {
    document.getElementById("timer").textContent = transformTimer(
      DEFAULT_MINUTE,
      0
    )
    unmuteAllAudios()
  }

  function updateTimer() {
    document.getElementById("timer").textContent = transformTimer(
      minutes,
      seconds
    )
  }

  document.getElementById("decrease").addEventListener("click", () => {
    if (isNotDefaultValuesIntervals()) {
      resetTimer()
    }

    if (minutes > MIN_MINUTE) {
      minutes -= INCREASE_DEFAULT
      updateTimer()
      playAudioClockCrank()
    }
  })

  document.getElementById("increase").addEventListener("click", () => {
    if (isNotDefaultValuesIntervals()) {
      resetTimer()
    }

    if (minutes < MAX_MINUTE) {
      minutes += INCREASE_DEFAULT
      updateTimer()
      playAudioClockCrank()
    }
  })

  startButton.addEventListener("click", () => {
    const isStartButton = startButton.textContent === "Start"

    if (isStartButton) {
      start = true
      toggleDisableButtonsOfIncreaseAndDecreaseTimer()
      changeNameButtonStart("Stop")
      startButtonAction()
    } else {
      start = false
      toggleDisableButtonsOfIncreaseAndDecreaseTimer()
      changeNameButtonStart("Start")
      stopButtonAction()
    }
  })

  document.getElementById("no-sound").addEventListener("click", () => {
    muteAllAudios()
    toggleButtonSound()
  })

  document.getElementById("with-sound").addEventListener("click", () => {
    unmuteAllAudios()
    toggleButtonSound()
  })

  document.getElementById("reset").addEventListener("click", () => {
    playAudioReset()
    resetTimer()
  })

  document
    .getElementById("modal-finish-timer")
    .firstElementChild.querySelector(".modal-footer")
    .querySelector(".btn-confirm")
    .addEventListener("click", () => {
      openOrCloseModal("modal-finish-timer")
    })

  document
    .getElementById("modal-add-task")
    .firstElementChild.querySelector(".modal-footer")
    .querySelector(".btn-confirm")
    .addEventListener("click", () => {
      openOrCloseModal("modal-add-task")
    })

  document
    .getElementById("modal-finish-timer")
    .firstElementChild.querySelector(".modal-options")
    .querySelector(".btn-close-modal")
    .addEventListener("click", () => {
      openOrCloseModal("modal-finish-timer")
    })

  document
    .getElementById("modal-add-task")
    .firstElementChild.querySelector(".modal-options")
    .querySelector(".btn-close-modal")
    .addEventListener("click", () => {
      openOrCloseModal("modal-add-task")
    })

  function startButtonAction() {
    document.getElementById("audio-start").play()

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
        setTimerInterval()
        remainingTime--
        updateTimer()
      } else {
        resetTimer()
        openOrCloseModal("modal-finish-timer")
        playAudioClockFinish()
      }
    }, 1000)
  }

  function openOrCloseModal(id) {
    const modal = document.getElementById(id)

    if (modal.style.display === "initial") setDisplayStyle(modal, "none")
    else setDisplayStyle(modal, "initial")
  }

  function stopButtonAction() {
    togglePlayAudioClockTicking()
    pauseAudioCountdown()
    playAudioStop()
    clearInterval(timerInterval)
  }

  function setTimerInterval() {
    if (seconds > 0) {
      seconds--
    } else {
      seconds = 59
      minutes--
    }
  }

  function clearTimer() {
    minutes = DEFAULT_MINUTE
    seconds = DEFAULT_SECONDS
    start = false
    toggleDisableButtonsOfIncreaseAndDecreaseTimer()
    togglePlayAudioClockTicking()
    pauseAudioCountdown()
    changeNameButtonStart("Start")
    updateTimer()
  }

  function transformTimer(minutes, seconds) {
    let minutesFormatted = minutes
    let secondsFormatted = seconds

    if (minutes < 10) {
      minutesFormatted = formatNumberOrSecond(minutes)
    }

    if (seconds < 10) {
      secondsFormatted = formatNumberOrSecond(seconds)
    }

    if (seconds === 60) {
      secondsFormatted = formatNumberOrSecond(0)
    }

    return `${minutesFormatted}:${secondsFormatted}`
  }

  function formatNumberOrSecond(timer) {
    return `0${timer}`
  }

  function changeNameButtonStart(text) {
    startButton.textContent = text
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
    setVolumeAudio("audio-finish", 0.1)
    setVolumeAudio("audio-crank", 0.1)
    setVolumeAudio("audio-ticking", 0.1)
    setVolumeAudio("audio-start", 0.1)
    setVolumeAudio("audio-stop", 0.1)
    setVolumeAudio("audio-reset", 0.1)
    setVolumeAudio("audio-countdown", 0.1)
  }

  function muteAllAudios() {
    setVolumeAudio("audio-crank", 0)
    setVolumeAudio("audio-ticking", 0)
    setVolumeAudio("audio-start", 0)
    setVolumeAudio("audio-stop", 0)
    setVolumeAudio("audio-reset", 0)
  }

  function toggleButtonSound() {
    const noSoundBtn = document.getElementById("no-sound")
    const withSoundBtn = document.getElementById("with-sound")

    if (noSoundBtn.style.display === "none") {
      setDisplayStyle(noSoundBtn, "initial")
      setDisplayStyle(withSoundBtn, "none")
    } else {
      setDisplayStyle(noSoundBtn, "none")
      setDisplayStyle(withSoundBtn, "initial")
    }
  }

  function resetTimer() {
    clearInterval(timerInterval)
    clearTimer()
  }

  function isNotDefaultValuesIntervals() {
    return !(minutes % 5 === 0 && seconds % 5 === 0)
  }

  function setDisplayStyle(element, displayValue) {
    element.style.display = displayValue
  }

  window.addEventListener("load", init)
})()
