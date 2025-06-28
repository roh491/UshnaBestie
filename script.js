document.addEventListener('DOMContentLoaded', function() {
  // Initialize all features
  initFloatingEmojis();
  initMusicPlayer();
  initCountdown();
  
  // Initial confetti burst
  setTimeout(triggerConfetti, 1000);
});

// 🌟 Floating Emojis Background
function initFloatingEmojis() {
  const emojis = ['🎈', '🎉', '✨', '🎁', '🌸', '💖', '🎊', '💫', '💎', '🎀'];
  const container = document.querySelector('.floating-elements');
  
  function createEmoji() {
    const emoji = document.createElement('div');
    emoji.classList.add('floating-emoji');
    emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    
    // Random position and size
    emoji.style.left = Math.random() * 100 + 'vw';
    emoji.style.top = Math.random() * 100 + 'vh';
    emoji.style.fontSize = (Math.random() * 20 + 20) + 'px';
    
    // Random animation
    emoji.style.animationDuration = (Math.random() * 10 + 5) + 's';
    emoji.style.animationDelay = (Math.random() * 5) + 's';
    
    container.appendChild(emoji);
    
    // Remove after animation
    setTimeout(() => {
      emoji.remove();
    }, 15000);
  }
  
  // Create emojis periodically
  setInterval(createEmoji, 500);
}

// 🎵 Music Player
function initMusicPlayer() {
  const musicToggle = document.getElementById('music-toggle');
  const bgMusic = document.getElementById('bg-music');
  
  // Try to autoplay (may be blocked by browser)
  bgMusic.volume = 0.3;
  const playPromise = bgMusic.play();
  
  if (playPromise !== undefined) {
    playPromise.catch(error => {
      // Autoplay was prevented
      musicToggle.innerHTML = '<i class="fas fa-music-slash"></i>';
    });
  }
  
  musicToggle.addEventListener('click', function() {
    if (bgMusic.paused) {
      bgMusic.play();
      musicToggle.innerHTML = '<i class="fas fa-music"></i>';
      musicToggle.classList.add('pulse');
    } else {
      bgMusic.pause();
      musicToggle.innerHTML = '<i class="fas fa-music-slash"></i>';
      musicToggle.classList.remove('pulse');
    }
  });
}

// ⏳ Countdown Timer
function initCountdown() {
  const birthday = new Date("2025-07-09T00:00:00").getTime();
  const timer = document.getElementById('timer');
  
  const countdown = setInterval(() => {
    const now = new Date().getTime();
    const gap = birthday - now;
    
    const days = Math.floor(gap / (1000 * 60 * 60 * 24));
    const hours = Math.floor((gap % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((gap % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((gap % (1000 * 60)) / 1000);
    
    timer.innerHTML = `
      <span>${days}<small>days</small></span>
      <span>${hours}<small>hours</small></span>
      <span>${mins}<small>mins</small></span>
      <span>${secs}<small>secs</small></span>
    `;
    
    if (gap < 0) {
      clearInterval(countdown);
      timer.innerHTML = "🎉 IT'S YOUR BIRTHDAY TODAY! 🎉";
      triggerSuperConfetti();
      
      // Change background celebration
      document.body.style.background = "linear-gradient(135deg, #ffd6e7, #ffb6d9, #ff8fab)";
    }
  }, 1000);
}

// 🎁 Gift Popup Functions
function revealGift() {
  document.getElementById('popup').style.display = 'flex';
  triggerSuperConfetti();
  
  // Animate the gift box opening
  const lid = document.querySelector('.lid');
  lid.style.animation = 'lidOpen 1s forwards';
  
  // Show message after animation
  setTimeout(() => {
    document.querySelector('.surprise-message').style.opacity = '1';
  }, 1000);
}

function closePopup() {
  document.getElementById('popup').style.display = 'none';
  // Reset lid animation
  document.querySelector('.lid').style.animation = 'lidBounce 2s infinite';
}

// 🎊 Confetti Effects
function triggerConfetti() {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#8a2be2', '#1e90ff', '#00d8d8', '#ff69b4', '#ff8c00', '#ffd700']
  });
}

function triggerSuperConfetti() {
  // First burst
  confetti({
    particleCount: 200,
    spread: 90,
    origin: { y: 0.6 },
    colors: ['#8a2be2', '#1e90ff', '#00d8d8', '#ff69b4'],
    shapes: ['circle', 'square']
  });
  
  // Left burst after delay
  setTimeout(() => {
    confetti({
      particleCount: 100,
      angle: 60,
      spread: 80,
      origin: { x: 0 },
      colors: ['#8a2be2', '#1e90ff']
    });
  }, 250);
  
  // Right burst after delay
  setTimeout(() => {
    confetti({
      particleCount: 100,
      angle: 120,
      spread: 80,
      origin: { x: 1 },
      colors: ['#00d8d8', '#ff69b4']
    });
  }, 400);
  
  // Star burst after delay
  setTimeout(() => {
    confetti({
      particleCount: 50,
      spread: 360,
      ticks: 100,
      shapes: ['star'],
      colors: ['#ffd700', '#ffffff']
    });
  }, 600);
}