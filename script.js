document.addEventListener('DOMContentLoaded', function () {
  const lottieContainer = document.getElementById('lottie-container');
  const lottieOverlay = document.getElementById('lottie-container-overlay');
  const backgroundVideo = document.getElementById('background-video');
  const fullBlurFilter = document.querySelector('#combined-blur feGaussianBlur:last-of-type');

  let blurAmount = 0;
  const maxBlur = 10;
  let previousX = null;
  let isPlaying = false;
  let isHovered = false;
  const motionThreshold = 5;

  // 첫 번째 애니메이션
  const animation = lottie.loadAnimation({
    container: lottieContainer,
    renderer: 'svg',
    loop: false,
    autoplay: false, // 자동 재생
    path: 'main.json',
  });

  // 두 번째 애니메이션 (오버레이)
  const overlayAnimation = lottie.loadAnimation({
    container: lottieOverlay,
    renderer: 'svg',
    loop: false,
    autoplay: false,
    path: 'main.json',
  });

  // 초기 상태에서 블러 효과를 0으로 설정
  fullBlurFilter.setAttribute('stdDeviation', 0);

  // Lottie 애니메이션의 현재 프레임 비율에 따라 비디오의 투명도 조정
  animation.addEventListener('enterFrame', function (event) {
    const currentFrame = animation.currentFrame; // 현재 프레임
    const totalFrames = animation.totalFrames; // 전체 프레임
    const opacity = currentFrame / totalFrames; // 현재 진행 비율
    backgroundVideo.style.opacity = opacity; // 비디오 투명도 업데이트
  });

  lottieContainer.addEventListener('mouseenter', () => {
    isHovered = true;
  });

  lottieContainer.addEventListener('mouseleave', () => {
    isHovered = false;
    animation.pause();
    overlayAnimation.pause();
  });

  lottieContainer.addEventListener('mousemove', (e) => {
    if (isHovered) {
      const currentX = e.clientX;

      if (previousX !== null) {
        const deltaX = Math.abs(currentX - previousX);

        if (deltaX > motionThreshold) {
          if (!isPlaying) {
            animation.play();
            overlayAnimation.play();
            isPlaying = true;
          }
        } else if (isPlaying) {
          animation.pause();
          overlayAnimation.pause();
          isPlaying = false;
        }
      }

      previousX = currentX;

      blurAmount = Math.min(blurAmount + 0.05, maxBlur);
      fullBlurFilter.setAttribute('stdDeviation', blurAmount);

      const rect = lottieContainer.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      lottieContainer.style.setProperty('--x', `${x}px`);
      lottieContainer.style.setProperty('--y', `${y}px`);
    }
  });
});
window.onload = function() {
  // 메시지와 오버레이 요소 가져오기
  const message = document.getElementById('message');
  const overlay = document.getElementById('overlay');

  // 4초 뒤에 둘 다 숨기기
  setTimeout(function() {
    message.classList.add('hidden');
    overlay.classList.add('hidden');
  }, 4000);
};

