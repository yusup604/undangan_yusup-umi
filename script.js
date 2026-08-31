// Target Waktu: 13 Desember 2026 pukul 08:00 Pagi
const eventCountdownDate = new Date("2026-12-13T08:00:00").getTime(); 

function runCountdown() {
    const now = new Date().getTime();
    const distance = eventCountdownDate - now;

    if (distance < 0) {
        document.getElementById("days").innerText = "00";
        document.getElementById("hours").innerText = "00";
        document.getElementById("mins").innerText = "00";
        document.getElementById("secs").innerText = "00";
        return;
    }

    const d = Math.floor(distance / (1000 * 60 * 60 * 24));
    const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = String(d).padStart(2, '0');
    document.getElementById("hours").innerText = String(h).padStart(2, '0');
    document.getElementById("mins").innerText = String(m).padStart(2, '0');
    document.getElementById("secs").innerText = String(s).padStart(2, '0');
}

setInterval(runCountdown, 1000);
runCountdown();

// MUSIK CONTROLLER
var audio = document.getElementById("myAudio");
document.body.addEventListener('click', function() {
    if (audio.paused) {
        audio.play();
        document.getElementById("music-control").innerText = "⏸️";
    }
}, { once: true });

function toggleMusic() {
    if (audio.paused) {
        audio.play();
        document.getElementById("music-control").innerText = "⏸️";
    } else {
        audio.pause();
        document.getElementById("music-control").innerText = "🎵";
    }
}
