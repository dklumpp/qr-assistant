const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const homeScreen = document.getElementById('home-screen');
const readerContainer = document.getElementById('reader-container');

// Wir erstellen den Scanner erst, wenn er gebraucht wird
let html5QrCode;

function speakText(text) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'de-DE';
    utterance.onend = () => { location.reload(); }; // Einfachster Weg: Seite neu laden nach dem Vorlesen
    window.speechSynthesis.speak(utterance);
}

startBtn.addEventListener('click', () => {
    // UI Umschalten
    homeScreen.style.display = 'none';
    readerContainer.style.display = 'block';

    html5QrCode = new Html5Qrcode("reader");
    
    const config = { fps: 10, qrbox: { width: 250, height: 250 } };

    html5QrCode.start(
        { facingMode: "environment" }, 
        config,
        (decodedText) => {
            // Erfolg
            html5QrCode.stop().then(() => {
                speakText(decodedText);
            });
        },
        (errorMessage) => { /* Scan läuft... */ }
    ).catch((err) => {
        // Das hier hilft uns bei der Fehlersuche:
        alert("Fehler beim Kamerastart: " + err);
        homeScreen.style.display = 'block';
        readerContainer.style.display = 'none';
    });
});

stopBtn.addEventListener('click', () => {
    if (html5QrCode) {
        html5QrCode.stop().then(() => {
            location.reload();
        });
    }
});
