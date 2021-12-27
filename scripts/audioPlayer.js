const audioList = document.getElementsByClassName('audioPlayer');
var changingSlider = false

function convertTime(timeInSec)
{
    const minutes = Math.floor(timeInSec / 60);
    const seconds = Math.floor(timeInSec % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${minutes}:${returnedSeconds}`;

}

function updateSliderBg(slider)
{
    var value = (slider.value-slider.min)/(slider.max-slider.min)*100
    slider.style.background = 'url("../images/bar.png"), linear-gradient(to right, #000000 0%, #000000 ' + value + '%, transparent ' + value + '%, transparent 100%)'
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
        updateSliderBg(event.target)
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
        event.target.parentElement.getElementsByClassName("timeContainer")[0].innerHTML = convertTime(event.target.currentTime)
        updateSliderBg(event.target.parentElement.getElementsByClassName("audioSlider")[0])
    })

    audioElement.addEventListener("ended", event => {
        event.target.currentTime = 0
        event.target.parentElement.getElementsByClassName("playButton")[0].children[0].src = "../images/play.png"
    })

    // set the play button
    audio.getElementsByClassName("playButton")[0].addEventListener("click", event => {
        if (event.target.parentElement.parentElement.parentElement.getElementsByClassName("audioElement")[0].paused)
        {
        event.target.parentElement.parentElement.parentElement.getElementsByClassName("audioElement")[0].play()
        event.target.src = "../images/pause.png"
        }
        else
        {
        event.target.parentElement.parentElement.parentElement.getElementsByClassName("audioElement")[0].pause()
        event.target.src = "../images/play.png"
        }
    })
});



