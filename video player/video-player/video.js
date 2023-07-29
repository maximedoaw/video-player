const container=document.querySelector('.container')
const mainVideo=document.querySelector('video')
const PlayPausebtn=document.querySelector(".play-pause i")
const ProgressBar=container.querySelector(".progress-bar")
const skipBackward=container.querySelector(".skip-backward i")
const skipForward=container.querySelector(".skip-forward i")
const current_volume=document.querySelector(".volume i")
const volumeSlider=document.querySelector('.left input')
const speedBtn=container.querySelector('.playback-speed span')
const  speedOption=document.querySelector('.speed-option')
const picInPicBtn=container.querySelector(".pic-in-pic")
const fullscreenBtn =document.querySelector('.fullscreen i')
const videoTimeline=container.querySelector('.video-timeline')
const currentVidTime=container.querySelector(".current-time")
const videoDuration=container.querySelector('.video-duration')
const formatTime= time => {
    //getting seconds,minutes,hours
    let seconds=Math.floor(time % 60),
    minutes=Math.floor(time / 60) % 60,
    hours=Math.floor(time / 3600)

    seconds= seconds < 10? `0${seconds}` : seconds
    minutes= seconds < 10? `0${minutes}` : minutes
    hours= seconds < 10? `0${hours}` : hours
    if (hours == 0) {
        return `${minutes}:${seconds}`
    }
    return `${hours}:${minutes}:${seconds}`
}




PlayPausebtn.addEventListener('click',() =>{
    //if  video is paused,play the video else pause the video
    mainVideo.paused? mainVideo.play() : mainVideo.pause()
})

mainVideo.addEventListener("play",() =>{//if video  is play,change icon to pause
    PlayPausebtn.classList.replace("fa-play","fa-pause")
})

mainVideo.addEventListener("pause",() =>{//if video is pause,change icon to play
    PlayPausebtn.classList.replace("fa-pause","fa-play")
})

mainVideo.addEventListener("timeupdate",e =>{
  let { currentTime,duration }=e.target// getting currentTime & duration of the video
  let percent=(currentTime/duration)*100 //gettingg percent
  ProgressBar.style.width=`${percent}%`//passing percent as progressBar width
   currentVidTime.innerHTML=formatTime(percent)
})

skipBackward.addEventListener("click",() =>{
    mainVideo.currentTime-=5 // subract 5 seconds from the current video time
})

skipForward.addEventListener("click",() => {
    mainVideo.currentTime+=5// add 5 seconds to the current video time
})

current_volume.addEventListener("click",() => {
    if (!current_volume.classList.contains("fa-volume-high")){// if volume icon isn't volume high icon
        mainVideo.volume=0.5 // passing 0.5 value as video volume
        current_volume.classList.replace("fa-volume-xmark","fa-volume-high")
    } else{
        mainVideo.volume=0.0 // passing 0.0 value as video volume,so the video mute
        current_volume.classList.replace("fa-volume-high","fa-volume-xmark")
    }
})

volumeSlider.addEventListener("input",e =>{
mainVideo.volume=e.target.value // passing slider value as video volume
if (e.target.value == 0) {
    current_volume.classList.replace("fa-volume-high","fa-volume-xmark")

}
else{
    current_volume.classList.replace("fa-volume-xmark","fa-volume-high")

}
volumeSlider.value=mainVideo.volume
})

picInPicBtn.addEventListener("click",() =>{
    mainVideo.requestPictureInPicture() // changing video mode to picture in picture
})

fullscreenBtn.addEventListener("click", () =>{
    container.classList.toggle("fullscreen")
    if (document.fullscreenElement) {// if video is already  in fullscreen mode
        fullscreenBtn.classList.replace("fa-compress" , "fa-expand")
        return document.exitFullscreen()
    }
    fullscreenBtn.classList.replace("fa-expand" , "fa-compress")
    container.requestFullscreen()
})

videoTimeline.addEventListener('click',e =>{
    let timelineWidth=videoTimeline.clientWidth // getting videoTimeline width
    mainVideo.currentTime=(e.offsetX/ timelineWidth)*mainVideo.duration // updating video currentTime
})
 
mainVideo.addEventListener("loadeddata",e =>{
    videoDuration.innerHTML=formatTime(e.target.duration)
} )
function draggableProgressBar(){
    let timelineWidth=videoTimeline.clientWidth // getting videoTimeline width
    ProgressBar.style.width=`${e.offsetX}px`
    mainVideo.currentTime=(e.offsetX/ timelineWidth)*mainVideo.duration
}
videoTimeline.addEventListener("mousedown",draggableProgressBar)

