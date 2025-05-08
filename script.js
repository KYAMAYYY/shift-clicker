let playerHealth = 100;
let playerPower = 15;
let enemyHealth = 100;
let enemyPower = 12;

function startGame() {
    document.getElementById("start-btn").disabled = true;
    document.getElementById("attack-btn").disabled = false;
    document.getElementById("battle-log").innerHTML = "<p>Игра началась! Готовься к бою!</p>";

    // Обновление статуса игрока
    document.getElementById("player-health").textContent = playerHealth;
    document.getElementById("player-power").textContent = playerPower;

    // Обновление статуса противника
    document.getElementById("enemy-health").textContent = enemyHealth;
    document.getElementById("enemy-power").textContent = enemyPower;
}

function attack() {
    // Игрок наносит урон
    enemyHealth -= playerPower;
    document.getElementById("enemy-health").textContent = enemyHealth;

    // Противник наносит урон
    playerHealth -= enemyPower;
    document.getElementById("player-health").textContent = playerHealth;

    // Обновление журнала боя
    let log = document.getElementById("battle-log");
    log.innerHTML += <p>Ты атаковал противника! Его здоровье: ${enemyHealth}</p>;
    log.innerHTML += <p>Противник атаковал тебя! Твое здоровье: ${playerHealth}</p>;

    // Проверка на победу или поражение
    if (enemyHealth <= 0) {
        log.innerHTML += "<p>Ты победил противника!</p>";
        document.getElementById("attack-btn").disabled = true;
    } else if (playerHealth <= 0) {
        log.innerHTML += "<p>Ты проиграл! Попробуй снова.</p>";
        document.getElementById("attack-btn").disabled = true;
    }
}