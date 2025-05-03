let shift = 0;
let level = 1;
let taps = 0;
let autoClickers = 0;
let gainMultiplier = 1;
let isBoostActive = false;
let shiftBank = 0;

const shiftEl = document.getElementById('shift');
const levelEl = document.getElementById('level');
const tapsEl = document.getElementById('taps');
const gainPerTapEl = document.getElementById('gainPerTap');
const achievementsList = document.getElementById('achievementsList');

const tapBtn = document.getElementById('tapBtn');
const buyAutoClickerBtn = document.getElementById('buyAutoClicker');
const levelUpBtn = document.getElementById('levelUp');
const buyBoosterBtn = document.getElementById('buyBooster');
const bankBtn = document.getElementById('collectBank');
const sendBtn = document.getElementById('sendBtn');

const bankProgressBar = document.getElementById('bankProgressBar');
const tapSound = document.getElementById('tapSound');
const bankSound = document.getElementById('bankSound');

const tg = window.Telegram.WebApp;
tg.expand();

function updateUI() {
  shiftEl.textContent = Math.floor(shift);
  levelEl.textContent = level;
  tapsEl.textContent = taps;
  gainPerTapEl.textContent = level * gainMultiplier;
  updateBankBar();
  saveProgress();
}

function updateBankBar() {
  const percent = Math.min((shiftBank / 100) * 100, 100);
  bankProgressBar.style.width = percent + '%';
}

function saveProgress() {
  const data = {
    shift, level, taps, autoClickers, shiftBank
  };
  localStorage.setItem('shiftGameData', JSON.stringify(data));
}

function loadProgress() {
  const saved = localStorage.getItem('shiftGameData');
  if (saved) {
    const data = JSON.parse(saved);
    shift = data.shift || 0;
    level = data.level || 1;
    taps = data.taps || 0;
    autoClickers = data.autoClickers || 0;
    shiftBank = data.shiftBank || 0;
  }
}

function checkAchievements() {
  const achievements = [];
  if (taps >= 100) achievements.push('100 Taps!');
  if (shift >= 1000) achievements.push('1000 SHIFT!');
  if (autoClickers >= 10) achievements.push('10 Автокликеров!');
  achievementsList.innerHTML = achievements.map(a => `<li>${a}</li>`).join('');
}

tapBtn.addEventListener('click', () => {
  const gain = level * gainMultiplier;
  shift += gain;
  taps++;
  shiftBank += gain * 0.05;

  tapSound.play();

  const floating = document.createElement('div');
  floating.textContent = `+${gain}`;
  floating.classList.add('floating-text');
  floating.style.left = `${Math.random() * 80 + 10}%`;
  floating.style.top = `${tapBtn.offsetTop}px`;
  document.body.appendChild(floating);
  setTimeout(() => floating.remove(), 1000);

  updateUI();
  checkAchievements();
});

buyAutoClickerBtn.addEventListener('click', () => {
  if (shift >= 10) {
    shift -= 10;
    autoClickers++;
    updateUI();
  }
});

levelUpBtn.addEventListener('click', () => {
  let cost = 20 + (level - 1) * 10;
  if (shift >= cost) {
    shift -= cost;
    level++;
    updateUI();
  }
});

buyBoosterBtn.addEventListener('click', () => {
  if (shift >= 50 && !isBoostActive) {
    shift -= 50;
    gainMultiplier = 2;
    isBoostActive = true;
    updateUI();
    setTimeout(() => {
      gainMultiplier = 1;
      isBoostActive = false;
      updateUI();
    }, 30000);
  }
});

bankBtn.addEventListener('click', () => {
  if (shiftBank > 0) {
    shift += shiftBank;
    shiftBank = 0;
    bankSound.play();
    updateUI();
  }
});

setInterval(() => {
  if (autoClickers > 0) {
    shift += autoClickers;
    updateUI();
    checkAchievements();
  }
}, 2000);

sendBtn.addEventListener('click', () => {
  tg.sendData(JSON.stringify({
    shift, level, taps, autoClickers, shiftBank
  }));
});

loadProgress();
updateUI();
