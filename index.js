/* global Element */
const SCREEN_WIDTH = window.screen.availWidth;
const SCREEN_HEIGHT = window.screen.availHeight;
const WIN_WIDTH = 480;
const WIN_HEIGHT = 360;
const VELOCITY = 15;
const MARGIN = 15;
const TOP_MARGIN = 50;
const TICK_LENGTH = 50;

const HIDDEN_STYLE = 'position: fixed; width: 1px; height: 1px; overflow: hidden; top: -10px; left: -10px;';

const ART = [
  `┊┊ ☆┊┊┊┊☆┊┊☆ ┊┊┊┊┊
┈┈┈┈╭━━━━━━╮┊☆ ┊┊
┈☆ ┈┈┃╳╳╳▕╲▂▂╱▏┊┊
┈┈☆ ┈┃╳╳╳▕▏▍▕▍▏┊┊
┈┈╰━┫╳╳╳▕▏╰┻╯▏┊┊
☆ ┈┈┈┃╳╳╳╳╲▂▂╱┊┊┊
┊┊☆┊╰┳┳━━┳┳╯┊ ┊ ☆┊`,
  `░░▓▓░░░░░░░░▓▓░░
░▓▒▒▓░░░░░░▓▒▒▓░
░▓▒▒▒▓░░░░▓▒▒▒▓░
░▓▒▒▒▒▓▓▓▓▒▒▒▒▓░
░▓▒▒▒▒▒▒▒▒▒▒▒▒▒▓
▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓
▓▒▒▒░▓▒▒▒▒▒░▓▒▒▓
▓▒▒▒▓▓▒▒▒▓▒▓▓▒▒▓
▓▒░░▒▒▒▒▒▒▒▒▒░░▓
▓▒░░▒▓▒▒▓▒▒▓▒░░▓
░▓▒▒▒▓▓▓▓▓▓▓▒▒▓░
░░▓▒▒▒▒▒▒▒▒▒▒▓░░
░░░▓▓▓▓▓▓▓▓▓▓░░░`
];

const VIDEOS = [
  'https://assets.codepen.io/344909/rick.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4'
];

const PHRASES = [
  'The wheels on the bus go round and round!',
  'Rainpain was here!',
  '01010010 01100001 01101001 01101110 01110000 01100001 01101001 01101110',
  'Why did you click me?',
  'This is so annoying!',
  'Hee haw hee haw hee haw!'
];

const wins = [];
let interactionCount = 0;

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
  showHelloMessage();
  init();
});

function init() {
  confirmPageUnload();
  interceptUserInput(handleUserInput);
}

function handleUserInput(event) {
  interactionCount++;
  event.preventDefault();
  event.stopPropagation();

  // Funciones básicas en cada interacción
  openWindow();
  startVibrateInterval();
  triggerFileDownload();
  focusWindows();
  copySpamToClipboard();
  speak();
  startTheramin();

  if (event.key === 'Meta' || event.key === 'Control') {
    window.print();
  } else {
    requestPointerLock();
    requestFullscreen();
    requestClipboardRead();
  }

  // En el primer click
  if (interactionCount === 1) {
    hideCursor();
    startVideo();
    startAlertInterval();
    rainbowThemeColor();
    removeHelloMessage();
    speak('That was a mistake');
  }
}

function showHelloMessage() {
  const template = document.querySelector('template');
  const clone = document.importNode(template.content, true);
  document.body.appendChild(clone);
}

function removeHelloMessage() {
  const helloMessage = document.querySelector('.hello-message');
  if (helloMessage) helloMessage.remove();
}

function confirmPageUnload() {
  window.addEventListener('beforeunload', (event) => {
    speak('Please don\'t go!');
    event.returnValue = true;
  });
}

function interceptUserInput(onInput) {
  const events = ['touchstart', 'mousedown', 'mouseup', 'click', 'keydown', 'keyup', 'keypress'];
  events.forEach(eventType => {
    document.body.addEventListener(eventType, onInput, { passive: false });
  });
}

// VENTANAS POPUP
function openWindow() {
  const { x, y } = getRandomCoords();
  const opts = `width=${WIN_WIDTH},height=${WIN_HEIGHT},left=${x},top=${y}`;
  try {
    const win = window.open(window.location.href, '', opts);
    if (win) wins.push(win);
  } catch (e) {
    console.log('Popup blocked');
  }
}

function focusWindows() {
  wins.forEach(win => {
    if (!win.closed) win.focus();
  });
}

function getRandomCoords() {
  const x = MARGIN + Math.floor(Math.random() * (SCREEN_WIDTH - WIN_WIDTH - MARGIN));
  const y = TOP_MARGIN + Math.floor(Math.random() * (SCREEN_HEIGHT - WIN_HEIGHT - TOP_MARGIN));
  return { x, y };
}

// VIDEO
function startVideo() {
  const video = document.createElement('video');
  video.src = getRandomArrayEntry(VIDEOS);
  video.autoplay = true;
  video.loop = true;
  video.style = 'width: 100%; height: 100%; position: fixed; top: 0; left: 0; z-index: 999;';
  document.body.appendChild(video);
}

// VIBRACIÓN
function startVibrateInterval() {
  if (typeof window.navigator.vibrate === 'function') {
    setInterval(() => {
      window.navigator.vibrate(200);
    }, 3000);
  }
}

// DESCARGAS
function triggerFileDownload() {
  const fileName = 'https://placekitten.com/400/300';
  const a = document.createElement('a');
  a.href = fileName;
  a.download = 'rainpain-cat.jpg';
  a.style = HIDDEN_STYLE;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

// TEXTO A VOZ
function speak(phrase) {
  if (!phrase) phrase = getRandomArrayEntry(PHRASES);
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(phrase);
    utterance.rate = 1.1;
    utterance.pitch = 1.3;
    window.speechSynthesis.speak(utterance);
  }
}

// PORTAPAPELES
function copySpamToClipboard() {
  const randomArt = getRandomArrayEntry(ART) + '\nHecho por Rainpain';
  clipboardCopy(randomArt);
}

function clipboardCopy(text) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style = HIDDEN_STYLE;
  document.body.appendChild(textArea);
  textArea.select();
  try {
    document.execCommand('copy');
  } catch (err) {
    console.log('Copy failed');
  }
  document.body.removeChild(textArea);
}

// THERAMIN
function startTheramin() {
  if (!window.AudioContext) return;
  
  const audioContext = new AudioContext();
  const oscillatorNode = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillatorNode.connect(gainNode);
  gainNode.connect(audioContext.destination);
  oscillatorNode.start(0);

  const oscillator = ({ pitch, volume }) => {
    oscillatorNode.frequency.value = 50 + pitch * 4000;
    gainNode.gain.value = volume * 0.5;
  };

  document.body.addEventListener('mousemove', (event) => {
    const { clientX, clientY } = event;
    const { clientWidth, clientHeight } = document.body;
    const pitch = (clientX - clientWidth / 2) / clientWidth;
    const volume = (clientY - clientHeight / 2) / clientHeight;
    oscillator({ pitch, volume });
  });
}

// FULLSCREEN
function requestFullscreen() {
  const requestFS = document.body.requestFullscreen || 
                   document.body.webkitRequestFullscreen || 
                   document.body.mozRequestFullScreen || 
                   document.body.msRequestFullscreen;
  if (requestFS) requestFS.call(document.body);
}

// POINTER LOCK
function requestPointerLock() {
  const requestPL = document.body.requestPointerLock || 
                   document.body.webkitRequestPointerLock || 
                   document.body.mozRequestPointerLock || 
                   document.body.msRequestPointerLock;
  if (requestPL) requestPL.call(document.body);
}

// LECTURA PORTAPAPELES
function requestClipboardRead() {
  if (navigator.clipboard && navigator.clipboard.readText) {
    navigator.clipboard.readText().then(
      text => window.alert(`Clipboard: ${text}`),
      () => {}
    );
  }
}

// OCULTAR CURSOR
function hideCursor() {
  document.querySelector('html').style.cursor = 'none';
}

// ALERTAS
function startAlertInterval() {
  setInterval(() => {
    if (Math.random() < 0.3) {
      showAlert();
    } else {
      window.print();
    }
  }, 30000);
}

function showAlert() {
  const randomArt = getRandomArrayEntry(ART);
  const longAlertText = Array(10).join(randomArt);
  window.alert(longAlertText);
}

// COLORES
function rainbowThemeColor() {
  const meta = document.querySelector('meta.theme-color');
  if (meta) {
    setInterval(() => {
      meta.setAttribute('content', '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0'));
    }, 1000);
  }
}

// UTILIDADES
function getRandomArrayEntry(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// MOVER VENTANAS (para ventanas hijas)
function moveWindowBounce() {
  let vx = VELOCITY * (Math.random() > 0.5 ? 1 : -1);
  let vy = VELOCITY * (Math.random() > 0.5 ? 1 : -1);

  setInterval(() => {
    const x = window.screenX;
    const y = window.screenY;
    const width = window.outerWidth;
    const height = window.outerHeight;

    if (x < MARGIN) vx = Math.abs(vx);
    if (x + width > SCREEN_WIDTH - MARGIN) vx = -Math.abs(vx);
    if (y < TOP_MARGIN) vy = Math.abs(vy);
    if (y + height > SCREEN_HEIGHT - MARGIN) vy = -Math.abs(vy);

    window.moveBy(vx, vy);
  }, TICK_LENGTH);
}

// Si es una ventana hija
if (window.opener) {
  moveWindowBounce();
  startVideo();
}