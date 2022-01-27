# simple-stopwatch-node

simple-stopwatch-node is package for running stopwatch functionality in node js.

## Installation

Use the package manager [npm]() to install foobar.

```bash
npm install simple-stopwatch-node --save
```

## Usage

```nodejs
const Stopwatch = require("simple-stopwatch-node")
const stopwatch = new Stopwatch()

// starting stopwatch from 0 seconds
stopwatch.start()

// starting stopwatch from x seconds
stopwatch.startFrom(60)
stopwatch.start()

// Starting stopwatch from x minutes
let mins = 35
let minsToSeconds = mins * 60
stopwatch.startFrom(minsToSeconds)
stopwatch.start()

// Starting stopwatch from x hours
let hours = 3
let hoursToSeconds = hours * 3600
stopwatch.startFrom(hoursToSeconds)
stopwatch.start()

// Pausing stopwatch
stopwatch.pause()

// Resuming stopwatch()
stopwatch.resume()

// Getting current time
stopwatch.getCurrentTime() // returns { formatted: String, seconds: numbers, obj: Object }

// Deducting time from current stopwatch
stopwatch.deductTime(seconds) // parameter must be a number

// Get current timer status
timer.status

// Tick event
stopwatch.on("tick", function(time) { // runs on every second
   console.log(time) // { formatted: String, seconds: numbers, obj: Object }
})

stopwatch.on("minute", function(time) { // runs on every minute
   console.log(time) // { formatted: String, seconds: numbers, obj: Object }
})

stopwatch.on("hour", function(time) { // runs on every hour
   console.log(time) // { formatted: String, seconds: numbers, obj: Object }
})
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
