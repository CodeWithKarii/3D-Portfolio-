// Create click sound effect
function playClickSound() {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.frequency.value = 800;
  oscillator.type = 'sine';
  
  gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
  
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.1);
}

// Function to navigate to portfolio
function contactAlert() {
  playClickSound();
  
  // Show loader
  const loader = document.getElementById('loader');
  const mainContent = document.getElementById('main-content');
  
  loader.style.display = 'flex';
  loader.style.opacity = '1';
  mainContent.style.display = 'none';

  // Simulate loading
  const progressFill = document.querySelector('.progress-fill');
  let progress = 0;
  const progressInterval = setInterval(() => {
    progress += Math.random() * 30;
    if (progress > 90) progress = 90;
    if (progressFill) progressFill.style.width = progress + '%';
  }, 200);

  setTimeout(() => {
    if (progressFill) progressFill.style.width = '100%';
    clearInterval(progressInterval);

    setTimeout(() => {
      // Navigate to portfolio page via Python Flask route
      window.location.href = '/go-portfolio';
    }, 500);
  }, 3000);
}

// Function to go back home
function goHome() {
  playClickSound();
  
  const loader = document.getElementById('loader');
  const mainContent = document.getElementById('main-content');
  
  loader.style.display = 'flex';
  loader.style.opacity = '1';
  mainContent.style.display = 'none';

  const progressFill = document.querySelector('.progress-fill');
  let progress = 0;
  const progressInterval = setInterval(() => {
    progress += Math.random() * 30;
    if (progress > 90) progress = 90;
    if (progressFill) progressFill.style.width = progress + '%';
  }, 200);

  setTimeout(() => {
    if (progressFill) progressFill.style.width = '100%';
    clearInterval(progressInterval);

    setTimeout(() => {
      // Use Python Flask redirect route
      window.location.href = '/go-home';
    }, 500);
  }, 3000);
}

// Matrix popup and audio
document.addEventListener('DOMContentLoaded', () => {
  const enterBtn = document.getElementById('enter-btn');
  const matrixPopup = document.getElementById('matrix-popup');
  const audio = document.getElementById('intro-audio');

  enterBtn.addEventListener('click', () => {
    playClickSound();
    
    // Hide matrix popup
    matrixPopup.classList.add('hidden');

    // Play audio
    if (audio) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          console.log("Audio play failed.");
        });
      }
    }

    // Remove popup from DOM after animation
    setTimeout(() => {
      matrixPopup.style.display = 'none';
    }, 500);
  });
});

// Loader fade-out
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  const mainContent = document.getElementById('main-content');
  const progressFill = document.querySelector('.progress-fill');

  // Simulate progress bar
  let progress = 0;
  const progressInterval = setInterval(() => {
    progress += Math.random() * 30;
    if (progress > 90) progress = 90;
    if (progressFill) progressFill.style.width = progress + '%';
  }, 200);

  // Delay to simulate loading
  setTimeout(() => {
    // Complete the progress bar
    if (progressFill) progressFill.style.width = '100%';
    clearInterval(progressInterval);

    // Fade out loader
    setTimeout(() => {
      loader.style.opacity = '0';
      setTimeout(() => {
        loader.style.display = 'none';
        mainContent.style.display = 'flex';
      }, 2000);
    }, 300);
  }, 3000);
});

// 3D Matrix Futuristic Background
class CodeLine {
  constructor(canvas) {
    this.canvas = canvas;
    this.reset();
    this.colorIndex = Math.floor(Math.random() * 7);
  }

  reset() {
    this.x = (Math.random() - 0.5) * this.canvas.width * 3;
    this.y = (Math.random() - 0.5) * this.canvas.height * 3;
    this.z = Math.random() * this.canvas.width + 100;
    this.vz = Math.random() * 4 + 2;
    this.code = this.generateCode();
    this.colorIndex = Math.floor(Math.random() * 7);
  }

  generateCode() {
    const codeSnippets = [
      'if (matrix) { activate(); }',
      'const reality = new Matrix();',
      'while (true) { echo("1010101"); }',
      'function decode(reality) { }',
      '>> system.initialize();',
      'Matrix.reshape(n_dimensions);',
      'データ = decrypt(true);',
      'for (let i = 0; i < ∞; i++) { }',
      'await consciousness.load();',
      '01010110 01100001 01110010',
      'SELECT * FROM reality WHERE true;',
      'class Existence { constructor() {} }',
      'void render(dimension d) { }',
      'quantum.entangle(consciousness);',
      'if (this === that) recursion();',
      'null.prototype.create();',
      'void main() { begin(); }',
      'parse(universe.source_code);'
    ];
    return codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
  }

  update() {
    this.z -= this.vz;
    if (this.z <= 0) {
      this.reset();
    }
  }

  display(ctx, canvas, rotX, rotY) {
    let x = this.x;
    let y = this.y;
    let z = this.z;

    // Rotate around X axis
    let cosX = Math.cos(rotX);
    let sinX = Math.sin(rotX);
    let y1 = y * cosX - z * sinX;
    let z1 = y * sinX + z * cosX;

    // Rotate around Y axis
    let cosY = Math.cos(rotY);
    let sinY = Math.sin(rotY);
    let x2 = x * cosY + z1 * sinY;
    let z2 = -x * sinY + z1 * cosY;

    // Only draw if in front of camera
    if (z2 > 50) {
      // Perspective projection
      let scale = 600 / z2;
      let sx = x2 * scale + canvas.width / 2;
      let sy = y1 * scale + canvas.height / 2;
      
      // Check if on screen
      if (sx > -200 && sx < canvas.width + 200 && sy > -50 && sy < canvas.height + 50) {
        let brightness = Math.max(0, 1 - z2 / (canvas.width * 2));
        let fontSize = Math.max(8, brightness * 16);
        
        // Color palette
        const colors = [
          '#00ff00',  // Green
          '#00ffff',  // Cyan
          '#ff00ff',  // Magenta
          '#ffff00',  // Yellow
          '#ff0080',  // Pink
          '#0080ff',  // Blue
          '#00ff80'   // Green-cyan
        ];
        
        const color = colors[this.colorIndex];
        
        ctx.save();
        ctx.globalAlpha = brightness * 0.8;
        ctx.fillStyle = color;
        ctx.font = `bold ${fontSize}px monospace`;
        ctx.shadowColor = color;
        ctx.shadowBlur = 10 * brightness;
        ctx.fillText(this.code, sx, sy);
        
        // Draw connecting lines to nearby code
        if (brightness > 0.6) {
          ctx.strokeStyle = `rgba(${color === '#00ff00' ? '0, 255, 0' : '255, 255, 255'}, ${brightness * 0.3})`;
          ctx.lineWidth = 1;
          // Small connecting lines
          ctx.beginPath();
          ctx.moveTo(sx, sy);
          ctx.lineTo(sx + fontSize * 2, sy - fontSize / 2);
          ctx.stroke();
        }
        
        ctx.restore();
      }
    }
  }
}

const canvas = document.getElementById('space-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  
  // Set canvas size
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();

  let codeLines = [];
  const codeCount = 150;

  // Create code lines
  for (let i = 0; i < codeCount; i++) {
    codeLines.push(new CodeLine(canvas));
  }

  // Mouse tracking for 3D rotation
  let mouseX = canvas.width / 2;
  let mouseY = canvas.height / 2;
  let targetRotX = 0;
  let targetRotY = 0;
  let rotX = 0;
  let rotY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Calculate rotation based on mouse position
    targetRotX = (mouseY - canvas.height / 2) * 0.0008;
    targetRotY = (mouseX - canvas.width / 2) * 0.0008;
  });

  // Touch support for mobile
  document.addEventListener('touchmove', (e) => {
    const touch = e.touches[0];
    mouseX = touch.clientX;
    mouseY = touch.clientY;
    
    targetRotX = (mouseY - canvas.height / 2) * 0.0008;
    targetRotY = (mouseX - canvas.width / 2) * 0.0008;
  });

  function animate() {
    // Smooth rotation transition
    rotX += (targetRotX - rotX) * 0.08;
    rotY += (targetRotY - rotY) * 0.08;

    // Clear canvas with trail effect
    ctx.fillStyle = 'rgba(0, 0, 10, 0.2)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Update and display code lines
    for (let codeLine of codeLines) {
      codeLine.update();
      codeLine.display(ctx, canvas, rotX, rotY);
    }

    requestAnimationFrame(animate);
  }

  animate();

  // Handle window resize
  window.addEventListener('resize', resizeCanvas);
}
