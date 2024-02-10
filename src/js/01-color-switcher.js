const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
let colorSwitch;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

startBtn.addEventListener('click', () => {
  colorSwitch = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);

  startBtn.disabled = true;
});

stopBtn.addEventListener('click', () => {
  clearInterval(colorSwitch);

  startBtn.disabled = false;
});
