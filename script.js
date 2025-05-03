}
let shift = 0;
let taps = 0;
let cloudLevel = 0;
let netLevel = 0;
let cloudCost = 10;
let netCost = 20;
let bankAmount = 0;
let cloudOfflineIncome = 0;
let netOnlineIncome = 0;

// Обработка кнопки тап
document.getElementById('tapBtn').addEventListener('click', function() {
  taps++;
  shift += 1;
  document.getElementById('shift').innerText = shift;
  document.getElementById('taps').innerText = taps;
});

// Обработка улучшения облачного фарминга
document.getElementById('upgradeCloud').addEventListener('click', function() {
  if (shift >= cloudCost && cloudLevel < 15) {
    shift -= cloudCost;
    cloudLevel++;
    cloudCost = Math.floor(cloudCost * 10);
    cloudOfflineIncome += 5;
    updateUI();
  }
});

// Обработка улучшения сетевого фарминга
document.getElementById('upgradeNet').addEventListener('click', function() {
  if (shift >= netCost && netLevel < 15) {
    shift -= netCost;
    netLevel++;
    netCost = Math.floor(netCost * 5);
    netOnlineIncome += 2;
    updateUI();
  }
});

// Сбор банка
document.getElementById('collectBank').addEventListener('click', function() {
  if (shift >= 50000) {
    bankAmount += shift * 0.1;
    shift -= shift * 0.1;
    updateUI();
  }
});

// Обновление интерфейса
function updateUI() {
  document.getElementById('shift').innerText = shift;
  document.getElementById('cloudLevel').innerText = cloudLevel;
  document.getElementById('netLevel').innerText = netLevel;
  document.getElementById('cloudCost').innerText = cloudCost;
  document.getElementById('netCost').innerText = netCost;
  document.getElementById('bankAmount').innerText = bankAmount;
}

// Таймер для облачного фарминга (офлайн)
setInterval(function() {
  shift += cloudOfflineIncome;
  updateUI();
}, 10000);

// Таймер для сетевого фарминга (онлайн)
setInterval(function() {
  shift += netOnlineIncome;
  updateUI();
}, 5000);

// Переключение вкладок
function switchTab(tab) {
  document.querySelectorAll('.tab-content').forEach((el) => {
    el.style.display = 'none';
  });
  document.getElementById(tab).style.display = 'block';
}