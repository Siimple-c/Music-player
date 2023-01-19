const song = document.querySelector('#audio');
const songArt = document.querySelector('.upper-section');
const vinyl = document.querySelector('.vinyl');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const playBtn = document.querySelector('.play-btn');
const currentTime = document.querySelector('.current-time');
const songDuration = document.querySelector('.song-length');
const seek = document.querySelector('.seek');
const songTitle = document.querySelector('.song-title');
const artiste = document.querySelector('.artiste');
// UP NEXT SECTION
const nextSongArt = document.querySelector('.next-song_art');
console.log(nextSongArt)
const nextSong =    document.querySelector('.next-song');
const nextArtiste = document.querySelector('.next-artiste');

let currentSong = 0;

playBtn.addEventListener('click', ()=> {
  if(playBtn.classList.contains('pause')){
    song.play();
  }else{
    song.pause()
  }
  playBtn.classList.toggle('pause');
  vinyl.classList.toggle('play');
})

function playSong(){
  vinyl.classList.add('play');
  playBtn.classList.remove('pause')
  song.play();
}

  function setSong(index){
  let track = songs[index];
  seek.value = 0;
  currentSong = index;

  song.src = track.path;
  songArt.style.backgroundImage = `url('${track.bigCover}')`;
  vinyl.style.backgroundImage = `url('${track.smallCover}')`;
  songTitle.innerHTML = track.title;
  artiste.innerHTML = track.artiste;

  currentTime.innerHTML = '00:00';
  setTimeout(()=>{
    seek.max = song.duration;
    songDuration.innerHTML = formatTime(song.duration);
  }, 700);
  
  setNextSong(index)
 }

 setSong(2);

 setInterval(()=>{
  seek.value = song.currentTime;
  currentTime.innerHTML = formatTime(song.currentTime);
  if(currentTime.innerHTML == songDuration.innerHTML){
    nextBtn.click();  }
 },500)

 seek.addEventListener('change',()=>{
  song.currentTime = seek.value;
 })

//  FORMAT TIME TO MINUTES & SECONDS
 function formatTime(time){
  let minutes = Math.floor(time/60);
  if(minutes < 10){
    minutes = `0${minutes}`;
  }
  let seconds = Math.floor(time % 60);
  if(seconds < 10){
    seconds = `0${seconds}`
  }
  return `${minutes} : ${seconds}`
 }  

//  NEXT & PREVIOUS BUTTONS
nextBtn.addEventListener('click', ()=>{
  if(currentSong >= songs.length -1){
    currentSong = 0;
  }else{
    currentSong++
  }
  setSong(currentSong);
  playSong();
})

prevBtn.addEventListener('click', () =>{
  if(currentSong == 0){
    currentSong = songs.length -1;
  }else{
    currentSong--;
  }
  setSong(currentSong);
  playSong();
})

function setNextSong(index){
  let next = songs[index + 1] ;
  if(next > songs.length-1){
    next = songs[0];
    nextSongArt.style.backgroundImage = `url('${next.smallCover}')`;
    nextArtiste.innerHTML = next.artiste;
    nextSong.innerHTML = next.title;
  }else{
  nextSongArt.style.backgroundImage = `url('${next.smallCover}')`;
  nextArtiste.innerHTML = next.artiste;
  nextSong.innerHTML = next.title;
  }
}