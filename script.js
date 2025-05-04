
let coins = parseInt(localStorage.getItem('coins')) || 0;
let clickers = parseInt(localStorage.getItem('clickers')) || 0;
let lastBonus = parseInt(localStorage.getItem('lastBonus')) || 0;

const coinCountEl = document.getElementById('coinCount');
const clickerCountEl = document.getElementById('clickerCount');
const tapCoinEl = document.getElementById('tapCoin');
const buyClickerBtn = document.getElementById('buyClicker');
const getBonusBtn = document.getElementById('getBonus');

function updateUI() {
    coinCountEl.textContent = coins;
    clickerCountEl.textContent = clickers;
    localStorage.setItem('coins', coins);
    localStorage.setItem('clickers', clickers);
}

tapCoinEl.addEventListener('click', () => {
    coins += 1;
    updateUI();
});

buyClickerBtn.addEventListener('click', () => {
    if (coins >= 10) {
        coins -= 10;
        clickers += 1;
        updateUI();
    }
});

getBonusBtn.addEventListener('click', () => {
    const now = Date.now();
    if (now - lastBonus >= 86400000) {
        coins += 20;
        lastBonus = now;
        localStorage.setItem('lastBonus', lastBonus);
        updateUI();
        alert("Вы получили 20 монет!");
    } else {
        alert("Бонус уже получен. Приходите завтра!");
    }
});

setInterval(() => {
    coins += clickers;
    updateUI();
}, 1000);

updateUI();
