console.log("Welcome to the Spotify Website");

//Initialize the Variables
let songIndex = 0;
let audioElemet = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressbar = document.getElementById('myProgressbar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById("masterSongName");
let songItem = Array.from(document.getElementsByClassName('songItems'));
let songs = [
    {songName: "Melody Your Nature", filePath:"songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "My Passion(Akcent)", filePath:"songs/2.mp3", coverPath: "covers/2.jpeg"},
    {songName: "Calm Down (Selene Gomez)", filePath:"songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Chhod Dou Aanchal Zamana Kia Kahega", filePath:"songs/4.mp3", coverPath: "covers/4.jpeg"},
    {songName: "Guli Mata", filePath:"songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Kusu Kusu", filePath:"songs/6.mp3", coverPath: "covers/6.jpg"},
    {songName: "We don't talk any more", filePath:"songs/7.mp3", coverPath: "covers/7.jpeg"},
    {songName: "Serai ft. Akcent", filePath:"songs/8.mp3", coverPath: "covers/8.jpeg"},
    {songName: "Dilbar - Satyameva Jayate", filePath:"songs/9.mp3", coverPath: "covers/9.jpeg"},
    {songName: "Normal", filePath:"songs/10.mp3", coverPath: "covers/9.jpeg"}
]

songItem.forEach((element, i) =>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})


//Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElemet.paused || audioElemet.currentTime<=0){
        audioElemet.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    }
    else{
        audioElemet.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
})


//Listen to Events

audioElemet.addEventListener('timeupdate', () => {

    //Update Seekbar

    progress = parseInt((audioElemet.currentTime/audioElemet.duration) * 100);
    myProgressbar.value = progress;

})


myProgressbar.addEventListener('change', ()=>{
    audioElemet.currentTime = myProgressbar.value * audioElemet.duration/100;
})

const makeAllPlays = () =>{
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
        element.classList.remove("fa-circle-pause");
        element.classList.add("fa-circle-play");
    })
}

Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) =>{
    element.addEventListener('click', (e)=>{
        if(audioElemet.paused){
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove("fa-circle-play");
        e.target.classList.add("fa-circle-pause");
        audioElemet.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElemet.currentTime = 0;
        audioElemet.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");
        }
        else{
        songIndex = parseInt(e.target.id);
        e.target.classList.remove("fa-circle-pause");
        e.target.classList.add("fa-circle-play");
        masterSongName.innerText = songs[songIndex].songName;
        audioElemet.pause();
        gif.style.opacity = 0;
        masterPlay.classList.remove("fa-circle-pause");
        masterPlay.classList.add("fa-circle-play");
        }
        
    })
})

document.getElementById("next").addEventListener('click', ()=>{
    if(songIndex >= 8){
        songIndex = 0;
    }
    else{
        songIndex += 1;
    }

    audioElemet.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElemet.currentTime = 0;
    audioElemet.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
})

document.getElementById("previous").addEventListener('click', ()=>{
    if(songIndex <= 0){
        songIndex = 0;
    }
    else{
        songIndex -= 1;
    }

    audioElemet.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElemet.currentTime = 0;
    audioElemet.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
})

audioElemet.addEventListener('ended', () => {
    // Auto-change to the next song
    if (songIndex < songs.length - 1) {
        songIndex++;
    } else {
        songIndex = 0; // Wrap around to the first song if at the end of the playlist
    }

    audioElemet.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElemet.currentTime = 0;
    // Update timestamp
    const nextSongTimestamp = formatTime(audioElemet.duration);
    document.getElementById(songIndex.toString()).nextElementSibling.innerText = nextSongTimestamp;

    audioElemet.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
});
