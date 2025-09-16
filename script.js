let balance = 0;
let clickPower = 1;
let passivePower = 0;
let clickLevel = 1;
let passiveLevel = 1;
let clickCost = 10;
let passiveCost = 20;
let username = '@username';

function updateUI() {
  document.getElementById('balance').innerText = balance + ' SHIFT';
  document.getElementById('clickLevel').innerText = clickLevel;
  document.getElementById('clickCost').innerText = clickCost;
  document.getElementById('passiveLevel').innerText = passiveLevel;
  document.getElementById('passiveCost').innerText = passiveCost;
  document.getElementById('username').innerText = username;
  document.getElementById('profileUsername').innerText = username;
}

document.getElementById('tapArea').addEventListener('click', () => {
  balance += clickPower;
  updateUI();
});

setInterval(() => {
  balance += passivePower;
  updateUI();
}, 1000);

function upgradeClick() {
  if (balance >= clickCost) {
    balance -= clickCost;
    clickPower *= 2;
    clickCost *= 2;
    clickLevel++;
    updateUI();
  }
}

function upgradePassive() {
  if (balance >= passiveCost) {
    balance -= passiveCost;
    passivePower = passivePower === 0 ? 1 : passivePower * 2;
    passiveCost *= 2;
    passiveLevel++;
    updateUI();
  }
}

function openTab(tab) {
  document.querySelectorAll('.tab').forEach(el => el.classList.remove('active'));
  document.getElementById(tab + 'Tab').classList.add('active');
}

function claimDaily() {
  const today = new Date().getDate();
  const reward = Math.floor((Math.pow(today, 2) / 10) * 10); // от 10 до 10000
  balance += reward;
  document.getElementById('dailyStatus').innerText = `Получено ${reward} монет`;
  updateUI();
}

function stake(percent, hours) {
  const amount = prompt('Сколько монет застейкать?');
  const numAmount = parseInt(amount);
  if (numAmount > 0 && numAmount <= balance) {
    balance -= numAmount;
    setTimeout(() => {
      balance += numAmount + Math.floor(numAmount * percent / 100);
      updateUI();
    }, hours * 3600000); // задержка
    updateUI();
  }
}

function sendCoins() {
  const to = document.getElementById('sendTo').value;
  const amount = parseInt(document.getElementById('sendAmount').value);
  if (amount > 0 && amount <= balance && to.startsWith('@')) {
    balance -= amount;
    const li = document.createElement('li');
    li.textContent = `Перевод ${amount} монет к ${to}`;
    document.getElementById('transferHistory').appendChild(li);
    updateUI();
  }
}

window.addEventListener('load', () => {
  updateUI();
});
