let shift = 0;
let taps = 0;
let cloudFarmLevel = 0;
let netFarmLevel = 0;
let cloudFarmIncome = 0;
let netFarmIncome = 0;

let cloudFarmCost = 100;
let netFarmCost = 200;
let upgrades = {
  upgrade1: 50,
  upgrade2: 100,
};

document.getElementById('tapBtn').addEventListener('click', () => {
  taps++;
  shift += 1;
  updateUI();
});

document.getElementById('upgradeCloudFarm').addEventListener('click', () => {
  if (shift >= cloudFarmCost && cloudFarmLevel < 15) {
    shift -= cloudFarmCost;
    cloudFarmLevel++;
    cloudFarmIncome += 2;
    cloudFarmCost = Math.floor(cloudFarmCost * 1.5);
    updateUI();
  }
});

document.getElementById('upgradeNetFarm').addEventListener('click', () => {
  if (shift >= netFarmCost && netFarmLevel < 15) {
    shift -= netFarmCost;
    netFarmLevel++;
    netFarmIncome += 3;
    netFarmCost = Math.floor(netFarmCost * 1.5);
    updateUI();
  }
});

document.getElementById('buyUpgrade1').addEventListener('click', () => {
  if (shift >= upgrades.upgrade1) {
    shift -= upgrades.upgrade1;
    upgrades.upgrade1 *= 1.5;
    updateUI();
  }
});

document.getElementById('buyUpgrade2').addEventListener('click', () => {
  if (shift >= upgrades.upgrade2) {
    shift -= upgrades.upgrade2;
    upgrades.upgrade2 *= 1.5;
    updateUI();
  }
});

function updateUI() {
  document.getElementById('shift').innerText = shift;
  document.getElementById('taps').innerText = taps;
  document.getElementById('cloudFarmLevel').innerText = cloudFarmLevel;
  document.getElementById('netFarmLevel').innerText = netFarmLevel;
  document.getElementById('cloudFarmIncome').innerText = cloudFarmIncome;
  document.getElementById('netFarmIncome').innerText = netFarmIncome;
}

function switchTab(tabId) {
  document.querySelectorAll('.tab-content').forEach((tab) => {
    tab.style.display = 'none';
  });
  document.getElementById(tabId).style.display = 'block';
}

setInterval(() => {
  shift += cloudFarmIncome;
  updateUI();
}, 1000);

setInterval(() => {
  shift += netFarmIncome;
  updateUI();
}, 1000);