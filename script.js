// Countdown Timer logic target: Nov 30, 2026 23:59:59
const launchDate = new Date("November 30, 2026 23:59:59").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = launchDate - now;

    if (distance < 0) {
        document.getElementById("days").innerText = "00";
        document.getElementById("hours").innerText = "00";
        document.getElementById("minutes").innerText = "00";
        document.getElementById("seconds").innerText = "00";
        document.getElementById("status-text").innerText = "¡LANZAMIENTO COMPLETADO!";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = days < 10 ? "0" + days : days;
    document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
    document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
    document.getElementById("seconds").innerText = seconds < 10 ? "0" + seconds : seconds;

    // Play acoustic pulse click on every second if sound is enabled
    if (soundEnabled) {
        playBeep();
    }
}

setInterval(updateCountdown, 1000);
updateCountdown();

// Dynamic Starfield Canvas Background
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

const stars = [];
for (let i = 0; i < 150; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2,
        speed: Math.random() * 0.5 + 0.1,
        alpha: Math.random()
    });
}

function animateStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(star => {
        star.y -= star.speed;
        if (star.y < 0) star.y = canvas.height;
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
    });
    requestAnimationFrame(animateStars);
}
animateStars();

// Floating Rocket Animations
const rocketContainer = document.getElementById('rocket-container');

function createFloatingRocket() {
    const rocket = document.createElement('div');
    rocket.className = 'floating-rocket';
    rocket.style.left = Math.random() * 90 + 5 + '%';
    rocket.style.animationDuration = (Math.random() * 6 + 8) + 's';
    
    // SVG icon matching Blue Launch Rocket circuit identity
    rocket.innerHTML = `
        <svg width="50" height="70" viewBox="0 0 100 120">
            <path d="M50 10 L80 50 L70 90 L50 110 L30 90 L20 50 Z" fill="#0D183E" stroke="#D4AF37" stroke-width="4"/>
            <path d="M50 30 L50 80 M50 80 L35 65 M50 80 L65 65" stroke="#D4AF37" stroke-width="3"/>
            <circle cx="35" cy="65" r="4" fill="#D4AF37"/>
            <circle cx="65" cy="65" r="4" fill="#D4AF37"/>
            <circle cx="50" cy="30" r="4" fill="#FFFFFF"/>
            <polygon points="40,110 50,125 60,110" fill="#FF8C00"/>
        </svg>
    `;
    
    rocketContainer.appendChild(rocket);
    
    setTimeout(() => {
        rocket.remove();
    }, 14000);
}

setInterval(createFloatingRocket, 3000);
createFloatingRocket();

// Web Audio API Synthesizer for Futurist Countdown Sound
let soundEnabled = false;
let audioCtx = null;

document.getElementById('sound-toggle').addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    const btn = document.getElementById('sound-toggle');
    const icon = document.getElementById('sound-icon');
    
    if (soundEnabled) {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        btn.style.borderColor = '#D4AF37';
        btn.style.color = '#D4AF37';
        icon.innerText = '🔊';
        btn.childNodes[1].textContent = ' Desactivar Audio';
        playBeep(); // test sound
    } else {
        icon.innerText = '🔇';
        btn.childNodes[1].textContent = ' Activar Audio Atmosférico';
    }
});

function playBeep() {
    if (!audioCtx) return;
    try {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, audioCtx.currentTime); // High tech beep
        osc.frequency.exponentialRampToValueAtTime(440, audioCtx.currentTime + 0.08);
        
        gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.08);
        
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        
        osc.start();
        osc.stop(audioCtx.currentTime + 0.08);
    } catch(e) {}
}
