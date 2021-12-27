const audioList = document.getElementsByClassName('audioPlayer');
var changingSlider = false

function convertTime(timeInSec)
{
    const minutes = Math.floor(timeInSec / 60);
    const seconds = Math.floor(timeInSec % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${minutes}:${returnedSeconds}`;

}

Array.prototype.forEach.call(audioList, audio => {
    // setup duration in slider and counter
    audioElement = audio.getElementsByClassName("audioElement")[0];
    audioElement.addEventListener('loadedmetadata', event => {
        event.target.parentElement.getElementsByClassName("audioSlider")[0].max = event.target.duration
        event.target.parentElement.getElementsByClassName("durationContainer")[0].innerHTML = convertTime(event.target.duration)
    });

    // set up slider to change counter when used
    audio.getElementsByClassName("audioSlider")[0].addEventListener("input", event => {
        event.target.parentElement.getElementsByClassName("timeContainer")[0].innerHTML  = convertTime(event.target.value) 
        changingSlider = true;
    })

    // set slider to change part of music playing when used
    audio.getElementsByClassName("audioSlider")[0].addEventListener("change", event => {
        event.target.parentElement.getElementsByClassName("audioElement")[0].currentTime = event.target.value
        changingSlider = false;
    })

    // set the audio element to change the sliders value whenever its time updates
    audioElement.addEventListener("timeupdate", event => {
        if (changingSlider)
        {
            return
        }
        event.target.parentElement.getElementsByClassName("audioSlider")[0].value = Math.floor(event.target.currentTime)
        console.log("pogging")
        event.target.parentElement.getElementsByClassName("timeContainer")[0].innerHTML = convertTime(event.target.currentTime)
    })

    // set the play button
    audio.getElementsByClassName("playButton")[0].addEventListener("click", event => {
        if (event.target.parentElement.parentElement.parentElement.getElementsByClassName("audioElement")[0].paused)
        {
        event.target.parentElement.parentElement.parentElement.getElementsByClassName("audioElement")[0].play()
        event.target.src = "images/pause.png"
        }
        else
        {
        event.target.parentElement.parentElement.parentElement.getElementsByClassName("audioElement")[0].pause()
        event.target.src = "images/play.png"
        }
    })
    
});



