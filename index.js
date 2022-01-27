const convert = require('convert-seconds')
const EventEmitter = require('events')

class Stopwatch extends EventEmitter {
  #timer
  #currentTime
  #formattedTime
  #timeObj

  constructor() {
    super()
    this.#timer = null
    this.#currentTime = 0
    this.#formattedTime = null
    this.#timeObj = {}
    this.status = "not started"
  }

  startFrom(seconds) {
    if(typeof seconds == "number") {
      this.#currentTime = seconds
    }
    else {
      throw new Error("startFrom parameter 1 must be a number")
    }
  }

  #checkEvents() {
    let obj = { formatted: this.#formattedTime, seconds: this.#currentTime, obj: this.#timeObj }
    this.emit("tick", obj)
    if(this.#currentTime % 60 == 0) { // for minute(s) events
      this.emit("minute", obj)
    }
    if(this.#currentTime % 3600 == 0) { // for hour(s) events
      this.emit("hour", obj)
    }
  }

  start() {
    this.status = "running"
    this.#timer = setInterval(() => {
      this.#currentTime += 1
      this.#timeObj = convert(this.#currentTime)
      let hrs = (this.#timeObj.hours.toString().length == 1) ? "0"+this.#timeObj.hours.toString() : this.#timeObj.hours
      let sec = (this.#timeObj.seconds.toString().length == 1) ? "0"+this.#timeObj.seconds.toString() : this.#timeObj.seconds
      let mins = (this.#timeObj.minutes.toString().length == 1) ? "0"+this.#timeObj.minutes.toString() : this.#timeObj.minutes
      this.#formattedTime = `${hrs}:${mins}:${sec}`
      this.#checkEvents()
    }, 1000)
  }

  pause() {
    this.status = "paused"
    clearInterval(this.#timer)
  }

  resume() {
    this.status = "running"
    this.#timer = setInterval(() => {
      this.#currentTime += 1
      this.#timeObj = convert(this.#currentTime)
      let hrs = (this.#timeObj.hours.toString().length == 1) ? "0"+this.#timeObj.hours.toString() : this.#timeObj.hours
      let sec = (this.#timeObj.seconds.toString().length == 1) ? "0"+this.#timeObj.seconds.toString() : this.#timeObj.seconds
      let mins = (this.#timeObj.minutes.toString().length == 1) ? "0"+this.#timeObj.minutes.toString() : this.#timeObj.minutes
      this.#formattedTime = `${hrs}:${mins}:${sec}`
    }, 1000)
  }

  deductTime(seconds) {
    if(typeof seconds == "number") {
      this.#currentTime = this.#currentTime - seconds
      if(this.#currentTime < 0) {
        this.#currentTime = 0
      }
    }
  }

  getCurrentTime() {
    return { formatted: this.#formattedTime, seconds: this.#currentTime, obj: this.#timeObj }
  }
}

module.exports = Stopwatch
