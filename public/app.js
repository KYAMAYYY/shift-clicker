const themeToggle = document.getElementById('themeToggle');
const refreshButton = document.getElementById('refresh');
const searchInput = document.getElementById('search');
const cryptoList = document.getElementById('crypto-list');
const favoritesList = document.getElementById('favorites-list');

let allCoins = [];
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

const applyTheme = () => {
  const isDark = localStorage.getItem('theme') === 'dark';
  document.body.classList.toggle('dark', isDark);
};

const toggleTheme = () => {
  const isDark = document.body.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
};

themeToggle.addEventListener('click', toggleTheme);

const saveFavorites = () => {
  localStorage.setItem('favorites', JSON.stringify(favorites));
  renderFavorites();
};

const addFavorite = (coinId) => {
  const coin = allCoins.find(c => c.id === coinId);
  if (coin && !favorites.find(f => f.id === coin.id)) {
    favorites.push(coin);
    saveFavorites();
  }
};

const renderFavorites = () => {
  favoritesList.innerHTML = '';
  favorites.forEach(coin => {
    const li = document.createElement('li');
    li.textContent = `${coin.name} — $${coin.current_price}`;
    favoritesList.appendChild(li);
  });
};

const renderCryptoList = (coins) => {
  cryptoList.innerHTML = '';
  coins.forEach(coin => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${coin.name} — $${coin.current_price}</span>
      <button onclick="addFavorite('${coin.id}')">⭐</button>
    `;
    cryptoList.appendChild(li);
  });
};

const renderChart = (coins) => {
  const ctx = document.getElementById('chart').getContext('2d');
  if (window.cryptoChart) window.cryptoChart.destroy();

  window.cryptoChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: coins.map(c => c.name),
      datasets: [{
        label: 'Цена USD',
        data: coins.map(c => c.current_price),
        backgroundColor: '#00c896',
      }]
    }
  });
};

const fetchCoins = async () => {
  try {
    const res = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=10');
    allCoins = await res.json();
    renderCryptoList(allCoins);
    renderChart(allCoins);
  } catch (err) {
    alert('Ошибка загрузки данных');
  }
};

searchInput.addEventListener('input', () => {
  const q = searchInput.value.toLowerCase();
  const filtered = allCoins.filter(c => c.name.toLowerCase().includes(q));
  renderCryptoList(filtered);
});

refreshButton.addEventListener('click', fetchCoins);

window.addFavorite = addFavorite;

window.onload = () => {
  applyTheme();
  fetchCoins();
  renderFavorites();
  if (window.Telegram.WebApp) {
    Telegram.WebApp.ready();
    Telegram.WebApp.expand();
  }
};
