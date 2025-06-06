const spinButton = document.getElementById('spin-button');
const reels = [
  document.getElementById('reel1'),
  document.getElementById('reel2'),
  document.getElementById('reel3')
];
const balanceEl = document.getElementById('balance');
const resultEl = document.getElementById('result');

let balance = 1000;
const symbols = ['🍒', '🍋', '🍉', '🍇', '🔔', '💎'];

spinButton.addEventListener('click', () => {
  if (balance < 100) {
    resultEl.innerText = 'Недостаточно средств!';
    return;
  }

  balance -= 100;
  balanceEl.innerText = balance;

  const result = reels.map(reel => {
    const symbol = symbols[Math.floor(Math.random() * symbols.length)];
    reel.innerText = symbol;
    return symbol;
  });

  if (result.every((val, i, arr) => val === arr[0])) {
    resultEl.innerText = '🎉 Вы выиграли 500 монет!';
    balance += 500;
    balanceEl.innerText = balance;
  } else {
    resultEl.innerText = 'Попробуйте снова!';
  }
});
