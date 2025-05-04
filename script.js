
let coins = parseInt(localStorage.getItem('coins')) || 0;
let clickers = parseInt(localStorage.getItem('clickers')) || 0;
let lastBonus = parseInt(localStorage.getItem('lastBonus')) || 0;

const coinCountEl = document.getElementById('coinCount');
const clickerCountEl = document.getElementById('clickerCount');
const cpsEl = document.getElementById('cps');
const tapCoinEl = document.getElementById('tapCoin');
const buyClickerBtn = document.getElementById('buyClicker');
const getBonusBtn = document.getElementById('getBonus');
const resetBtn = document.getElementById('resetGame');

function updateUI() {
    coinCountEl.textContent = coins;
    clickerCountEl.textContent = clickers;
    cpsEl.textContent = clickers;
    localStorage.setItem('coins', coins);
    localStorage.setItem('clickers', clickers);
}

tapCoinEl.addEventListener('click', () => {
    coins += 1;
    updateUI();
});

buyClickerBtn.addEventListener('click', () => {
    const cost = 10;
    if (coins >= cost) {
        coins -= cost;
        clickers += 1;
        updateUI();
    } else {
        alert("Недостаточно монет!");
    }
});

getBonusBtn.addEventListener('click', () => {
    const now = Date.now();
    if (now - lastBonus >= 86400000) {
        const bonus = 50;
        coins += bonus;
        lastBonus = now;
        localStorage.setItem('lastBonus', lastBonus);
        updateUI();
        alert(`Вы получили ${bonus} монет!`);
    } else {
        const hoursLeft = Math.ceil((86400000 - (now - lastBonus)) / 3600000);
        alert(`Приходите позже! До следующего бонуса ~${hoursLeft}ч.`);
    }
});

resetBtn.addEventListener('click', () => {
    if (confirm("Вы уверены, что хотите сбросить прогресс?")) {
        coins = 0;
        clickers = 0;
        lastBonus = 0;
        localStorage.clear();
        updateUI();
    }
});

// Доход от автокликеров
setInterval(() => {
    coins += clickers;
    updateUI();
}, 1000);

updateUI();
