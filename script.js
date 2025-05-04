let userData = {
    username: "guest",
    balance: 100,
    lastReward: 0,
};

let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || {};

function saveData() {
    localStorage.setItem("userData", JSON.stringify(userData));
    leaderboard[userData.username] = userData.balance;
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
    updateUI();
}

function loadData() {
    const saved = localStorage.getItem("userData");
    if (saved) {
        userData = JSON.parse(saved);
    }
    updateUI();
}

function updateUI() {
    document.getElementById("user-name").textContent = userData.username;
    document.getElementById("user-balance").textContent = userData.balance;
    updateLeaderboard();
}

function getDailyReward() {
    const now = Date.now();
    if (now - userData.lastReward > 86400000) {
        const reward = Math.floor(Math.random() * 100) + 50;
        userData.balance += reward;
        userData.lastReward = now;
        document.getElementById("reward-status").textContent = `Вы получили ${reward} SHIFT!`;
        saveData();
    } else {
        document.getElementById("reward-status").textContent = "Награда уже получена сегодня.";
    }
}

function rollDice() {
    const bet = parseInt(document.getElementById("dice-bet").value);
    if (isNaN(bet) || bet <= 0 || bet > userData.balance) {
        document.getElementById("dice-result").textContent = "Недопустимая ставка.";
        return;
    }
    const dice1 = Math.floor(Math.random() * 6) + 1;
    const dice2 = Math.floor(Math.random() * 6) + 1;
    const total = dice1 + dice2;
    let result = `Выпало ${dice1} и ${dice2} (сумма: ${total}). `;

    if (total > 7) {
        userData.balance += bet;
        result += `Вы выиграли ${bet} SHIFT!`;
    } else {
        userData.balance -= bet;
        result += `Вы проиграли ${bet} SHIFT.`;
    }
    document.getElementById("dice-result").textContent = result;
    saveData();
}

function tapForCoins() {
    const reward = Math.floor(Math.random() * 5) + 1;
    userData.balance += reward;
    document.getElementById("tap-result").textContent = `+${reward} SHIFT!`;
    saveData();
}

function showTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.style.display = 'none';
    });
    document.getElementById(tabId).style.display = 'block';
}

function updateLeaderboard() {
    const list = document.getElementById("leaderboard-list");
    list.innerHTML = "";
    const sorted = Object.entries(leaderboard).sort((a, b) => b[1] - a[1]);
    sorted.forEach(([user, score]) => {
        const item = document.createElement("li");
        item.textContent = `${user}: ${score} SHIFT`;
        list.appendChild(item);
    });
}

function sendTransfer() {
    const target = document.getElementById("transfer-user").value.trim();
    const amount = parseInt(document.getElementById("transfer-amount").value);

    if (!target || isNaN(amount) || amount <= 0 || amount > userData.balance) {
        document.getElementById("transfer-status").textContent = "Ошибка перевода.";
        return;
    }

    leaderboard[target] = (leaderboard[target] || 0) + amount;
    userData.balance -= amount;
    document.getElementById("transfer-status").textContent = `Вы перевели ${amount} SHIFT пользователю ${target}`;
    saveData();
}

window.onload = loadData;
