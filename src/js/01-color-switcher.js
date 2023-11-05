const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const container = document.querySelector('body');
let changeColor = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

let onClick = () => {
  if (changeColor === null) {
    startBtn.disabled = true;
    changeColor = setInterval(() => {
      container.style.backgroundColor = getRandomHexColor();
    }, 1000);
  }
};

startBtn.addEventListener('click', onClick);

stopBtn.addEventListener('click', () => {
  clearInterval(changeColor);
  startBtn.disabled = false; // Enable the button after stopping the interval
  changeColor = null;
  startBtn.addEventListener('click', onClick);
});

