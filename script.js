document.addEventListener('DOMContentLoaded', function () {
  const video = document.getElementById('punch-video');
  const nextVideos = ['ex1.mp4', 'ex2.mp4', 'ex3.mp4']; 
  let startTime = 0; 
  let isPlaying = false;

  const handleClick = () => {
    if (isPlaying) return; 

    isPlaying = true; 
    video.currentTime = startTime; 
    video.play(); 

    setTimeout(() => {
      video.pause(); 
      startTime += 2; 

      if (startTime >= video.duration) {
      
        loadRandomVideo(); 
        video.removeEventListener('click', handleClick); 
      }
      isPlaying = false; 
    }, 2000); 
  };

  const loadRandomVideo = () => {
    const randomIndex = Math.floor(Math.random() * nextVideos.length);
    video.src = nextVideos[randomIndex];
    video.loop = true; 
    video.load(); 

    video.addEventListener('loadeddata', () => {
      video.play();
      video.removeEventListener('click', handleClick); 
    }, { once: true });
  };

  video.addEventListener('click', handleClick);
});

document.addEventListener('DOMContentLoaded', function () {
  const video = document.getElementById('punch-video');
  
  const resizeVideo = () => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight; 

    video.style.width = `${windowWidth}px`;
    video.style.height = 'auto'; 

    video.style.position = 'absolute';
    video.style.top = '50%';
    video.style.left = '50%';
    video.style.transform = 'translate(-50%, -50%)'; 
  };

  window.addEventListener('resize', resizeVideo);

  resizeVideo();
});

document.addEventListener('DOMContentLoaded', function () {
  document.body.style.overflow = 'hidden';
  document.documentElement.style.overflow = 'hidden'; 
});
