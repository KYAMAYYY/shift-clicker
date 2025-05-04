let userBalance = 100; // Начальный баланс
let lastDailyReward = 0; // Время последнего получения награды (в секундах)

const balanceText = document.getElementById('balanceText');
const dailyRewardButton = document.getElementById('dailyRewardButton');
const dailyRewardMessage = document.getElementById('dailyRewardMessage');
const rollDiceButton = document.getElementById('rollDiceButton');
const betAmountInput = document.getElementById('betAmount');
const diceResultText = document.getElementById('diceResult');
const betResultText = document.getElementById('betResult');

// Обновляем текст баланса
function updateBalance() {
    balanceText.textContent = Ваш баланс: ${userBalance} SHIFT;
}

// Получение ежедневной награды
dailyRewardButton.addEventListener('click', () => {
    const currentTime = Date.now() / 1000; // Время в секундах
    const timeDifference = currentTime - lastDailyReward;

    if (timeDifference < 86400) {
        // Если прошло меньше 24 часов
        dailyRewardMessage.textContent = 'Вы уже получали ежедневную награду сегодня. Подождите до завтра.';
        return;
    }

    // Если прошло больше 24 часов, даем награду
    const reward = Math.floor(Math.random() * 50) + 50; // Случайная награда от 50 до 100 SHIFT
    userBalance += reward;
    lastDailyReward = currentTime; // Обновляем время последнего получения награды

    dailyRewardMessage.textContent = Вы получили ${reward} SHIFT в качестве ежедневной награды!;
    updateBalance();
});

// Мини-игра в кости с ставкой
rollDiceButton.addEventListener('click', () => {
    const betAmount = parseInt(betAmountInput.value, 10);

    if (isNaN(betAmount) || betAmount <= 0) {
        betResultText.textContent = 'Введите допустимую сумму ставки!';
        return;
    }

    if (betAmount > userBalance) {
        betResultText.textContent = 'У вас недостаточно средств для этой ставки!';
        return;
    }

    // Генерация случайных чисел для двух костей
    const dice1 = Math.floor(Math.random() * 6) + 1;
    const dice2 = Math.floor(Math.random() * 6) + 1;

    diceResultText.textContent = Выпали кости: ${dice1} и ${dice2};

    // Логика для выигрыша или проигрыша
    const sum = dice1 + dice2;

    if (sum > 7) {
        // Выигрыш
        userBalance += betAmount;
        betResultText.textContent = Поздравляем! Вы выиграли ${betAmount} SHIFT!;
    } else {
        // Проигрыш
        userBalance -= betAmount;
        betResultText.textContent = Увы, вы проиграли ${betAmount} SHIFT.;
    }

    updateBalance();
});