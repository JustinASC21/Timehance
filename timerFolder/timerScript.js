// time var
timeRunning = false;
let Stopwatchreset = false;
let countdownTimerRunning = false;
let resetTimerValue = false;
// buttons on nav
let clockNav = document.querySelector("#clockDiv");
let stopwatchNav = document.querySelector("#stopwatchDiv");
let timerNav = document.querySelector("#timerDiv");
// body
let body = document.querySelector("body");
let lightCyan = true;

// time pages
let clockPage = document.querySelector("#clockPage")
let stopwatchPage = document.querySelector("#stopwatchPage")
let timerPage = document.querySelector("#timerPage")

// buttons for stopwatch
let countingTime = document.querySelector("#stopwatchTime");
let startButton = document.querySelector("#startButton");
let stopButtton = document.querySelector("#stopButton")
let resumeButton = document.querySelector("#continueButton")
let resetButton = document.querySelector("#resetButton")

// inputs for timer
let secondsInput = document.querySelector("#seconds");
let minutesInput = document.querySelector("#minutes");
let hoursInput = document.querySelector("#hours");
let Sbutton = document.querySelector("#Sbutton");
let stopTimer = document.querySelector("#stopTimer");
let resetTimer = document.querySelector("#resetTimer");

// clock
let rollingTime = document.querySelector("#rollingTime")

// clock below
clockNav.onclick = function(event) {
    // when the clock div has been clicked we show the normal clock
    event.preventDefault();
    timerPage.style.display = "none";
    stopwatchPage.style.display = "none";
    clockPage.style.display = "block";
    clockPage.style.display = "flex";
    function displayTime() {

        let worldTimeValue = new Date();
        let currentHour = worldTimeValue.getHours()
        let currentMinute = worldTimeValue.getMinutes();
        let currentSecond = worldTimeValue.getSeconds();
        function parseHour(hour) {
            if (hour > 12) {
                hour = hour - 12;
            }
            else if (hour == 0) {
                hour = 12;
            }
            return hour;
        }  
        if (currentHour > 12) {
    
            rollingTime.innerHTML = DoubleDigits(parseHour(currentHour)) + ":" + DoubleDigits(currentMinute) + ":" + DoubleDigits(currentSecond) + " pm";
        } 
        else {
    
            rollingTime.innerHTML = DoubleDigits(parseHour(currentHour)) + ":" + DoubleDigits(currentMinute) + ":" + DoubleDigits(currentSecond) + " am";
        }
        if (currentSecond == 58) {
            // here we provide animation
            if (lightCyan) {

                body.style.animation = "ColorfadeOut 4s forwards";
                lightCyan = !lightCyan;
            }
            else {
                body.style.animation = "ColorfadeIn 4s forwards";
                lightCyan = !lightCyan;
            }
        }
    }
    setInterval(displayTime,1000);
}
stopwatchNav.onclick = function(event) {
    event.preventDefault();
    clockPage.style.display = "none";
    timerPage.style.display = "none";
    stopwatchPage.style.display = "block";
    stopwatchPage.style.display = "flex";

}

timerNav.onclick = function(event) {
    let timerContainers = document.querySelector(".timerContainers");

    event.preventDefault();
    clockPage.style.display = "none";
    stopwatchPage.style.display = "none";
    timerPage.style.display = 'block';
    timerPage.style.display = "flex";
    // timerPage.style.justifyContent = "center";
    timerPage.style.alignItems = "center";
    timerPage.style.flexDirection = "column";

}
// timer below
function DoubleDigits(value) {
    if (String(value).length == 1) {
        return "0" + String(value);
    }
    else {
        return value;
    }

}
Sbutton.onclick = function(event) {
    // when the button is clicked start timer
    countdownTimerRunning = true;
    
    event.preventDefault();
    let countdown = document.querySelector("#countdown")
    countdown.style.display = "block";
    // grab inputs here

    let sec = secondsInput.value;
    let min = minutesInput.value;
    let hour = hoursInput.value;

    secondsInput.value = "";
    minutesInput.value = "";
    hoursInput.value = "";

    // calculate total time
    function calculateTime(h,m,s) {
        let totalSec = 0;
        // console.log(h)
        if ((h != null) && (h > -1)) {
            if (h == "") {
                h = 0;
            }
            totalSec = (parseInt(h) * 3600) + totalSec;
        }
        if ((m != null) && (m > -1)) {
            if (m == "") {
                m = 0;
            }
            totalSec = (parseInt(m) * 60) + totalSec;
            // console.log(totalSec)
        }
        if ((s != null) && (s > -1)) {
            if (s == "") {
                s = 0;
            }
            totalSec = ((parseInt(s) * 1) + totalSec);
        }
        // console.log(totalSec)
        return totalSec;
    }
    function convertTimeFormat(sec) {
        let hours = Math.floor(sec/ 3600)
        let minutes = Math.floor((sec-hours*3600)/60);
        let seconds = sec % 60;
        // console.log(hours)
        // console.log(minutes)
        // console.log(seconds)
        return DoubleDigits(hours) + ":" + DoubleDigits(minutes) + ":" + DoubleDigits(seconds);
    }
    let totalTime = calculateTime(hour,min,sec);
    function countTime() {
        countdown.innerHTML = convertTimeFormat(totalTime);

        totalTime--;


        if (parseInt(totalTime) == -2) {
            alert("Finished!");
            countdown.innerHTML = "00:00:00";
            stop();
        }
        if (countdownTimerRunning) {

        }
        else {
            stop();
        }
    }
    let timing = setInterval(countTime,1000);
    function stop() {
        clearInterval(timing)
    }
    
    
}
stopTimer.onclick = function(event) {
    event.preventDefault();
    // when the timer is stopped pause it
    countdownTimerRunning = false;
}
resetTimer.onclick = function(event) {
    event.preventDefault();
    countdownTimerRunning = false;
    let countdown = document.querySelector("#countdown");
    countdown.innerHTML = "00:00:00";
}
// stopwatch below
startButton.onclick = function(event) {
    event.preventDefault();
    let count = 1;
    // console.log(count)
    timeRunning = true;
    Stopwatchreset = false;
    function myTime() {
        let hours = Math.floor(count/3600);
        let minutes = Math.floor((count-hours*3600) / 60)
        
        countingTime.innerHTML = DoubleDigits(hours) + ":" + DoubleDigits(minutes) + ":" + DoubleDigits(count);
        count++;
        if (timeRunning) {
            // console.log("running")
        }
        else if (Stopwatchreset) {
            clearInterval(secondSkip);
            countingTime.innerHTML = "00:00:00";
            Stopwatchreset = false;
        }
        else {
            clearInterval(secondSkip);
        }
    }
    let secondSkip = setInterval(myTime,1000);
}
stopButtton.onclick = function(event) {
    event.preventDefault();
    timeRunning = false;
}
resumeButton.onclick = function(event) {
    event.preventDefault();
    let hours = parseInt(countingTime.innerHTML.split(":")[0]) * 3600;
    let minutes = parseInt(countingTime.innerHTML.split(":")[1]) * 60;
    let seconds = parseInt(countingTime.innerHTML.split(":")[2]) * 1;

    let count = hours + minutes + seconds;

    console.log(hours)
    console.log(minutes)
    console.log(seconds)
    console.log(count)
    timeRunning = true;
    Stopwatchreset = false;
    function myTime() {
        let hours = Math.floor(count/3600);
        let minutes = Math.floor((count-hours*3600) / 60)
        
        countingTime.innerHTML = DoubleDigits(hours) + ":" + DoubleDigits(minutes) + ":" + DoubleDigits(count);
        count++;
        if (timeRunning) {
        }
        else if (Stopwatchreset) {
            clearInterval(secondSkip);
            countingTime.innerHTML = "00:00:00";
            Stopwatchreset = false;
        }
        else {
            clearInterval(secondSkip);
        }
    }
    let secondSkip = setInterval(myTime,1000);
}
resetButton.onclick = function(event) {
    event.preventDefault();
    timeRunning = false;
    Stopwatchreset = true;
    countingTime.innerHTML = "00:00:00";
}