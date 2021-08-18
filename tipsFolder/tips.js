let button = document.querySelector("button")
let quote = document.querySelector(".quote")
let textDiv = document.querySelector(".text")
let Name = document.querySelector(".author")
let myAudio = document.querySelector("audio");
let muteButton = document.querySelector("#buttonContainer");
let sound = true;

muteButton.onclick = function(event) {
    event.preventDefault();

    if (sound) {
        myAudio.pause();
        sound = !sound
        muteButton.style.backgroundImage = "url(../images/mute.png)";
    }
    else {
        myAudio.play();
        sound = !sound;
        muteButton.style.backgroundImage = "url(../images/soundOn.png)";
    }

}

button.onclick = function(event) {

    let random = Math.random();
    let randNum = random * 51;
    let randInt = Math.floor(randNum);
    event.preventDefault();
    fetch("https://type.fit/api/quotes")
        .then(function(response) {
          return response.json();
        })
        .then(function(myJson) {
            let text = myJson[randInt].text;
            let author = myJson[randInt].author;

            console.log("Status request")

            quote.innerHTML = text;
            Name.innerHTML = " - " + author;
            Name.style.fontSize = "32px";
            Name.style.textAlign = "center";
            quote.style.fontSize = "2.1em"
           

            
            
        });

    }

   
