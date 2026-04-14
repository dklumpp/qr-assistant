{\rtf1\ansi\ansicpg1252\cocoartf2869
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww29700\viewh16060\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 const startBtn = document.getElementById('start-btn');\
const stopBtn = document.getElementById('stop-btn');\
const homeScreen = document.getElementById('home-screen');\
const readerContainer = document.getElementById('reader-container');\
\
const html5QrCode = new Html5Qrcode("reader");\
\
// Funktion zum Vorlesen\
function speakText(text) \{\
    // Falls noch etwas gesprochen wird, stoppen\
    window.speechSynthesis.cancel();\
\
    const utterance = new SpeechSynthesisUtterance(text);\
    utterance.lang = 'de-DE'; // Sprache auf Deutsch setzen\
    \
    utterance.onend = () => \{\
        // Wenn das Sprechen beendet ist, zur\'fcck zum Start\
        resetApp();\
    \};\
\
    window.speechSynthesis.speak(utterance);\
\}\
\
// App zur\'fccksetzen\
function resetApp() \{\
    readerContainer.classList.add('hidden');\
    homeScreen.classList.remove('hidden');\
\}\
\
// Scanner starten\
startBtn.addEventListener('click', () => \{\
    homeScreen.classList.add('hidden');\
    readerContainer.classList.remove('hidden');\
\
    const config = \{ fps: 10, qrbox: \{ width: 250, height: 250 \} \};\
\
    html5QrCode.start(\
        \{ facingMode: "environment" \}, // Nutzt die R\'fcckkamera\
        config,\
        (decodedText) => \{\
            // Erfolg: Code gefunden\
            html5QrCode.stop().then(() => \{\
                speakText(decodedText);\
            \});\
        \},\
        (errorMessage) => \{\
            // Scan l\'e4uft noch... (Fehler ignorieren wir hier f\'fcr den Flow)\
        \}\
    ).catch((err) => \{\
        console.error("Kamera-Fehler:", err);\
        resetApp();\
    \});\
\});\
\
// Abbrechen Button\
stopBtn.addEventListener('click', () => \{\
    html5QrCode.stop().then(() => \{\
        resetApp();\
    \});\
\});}