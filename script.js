// Функция для обработки нажатия кнопки
document.getElementById('startButton').addEventListener('click', function() {
  let messageElement = document.getElementById('message');
  messageElement.textContent = 'Игра началась! Приятной игры!';
  
  // Можно добавить логику для дальнейшего взаимодействия
  setTimeout(function() {
      messageElement.textContent = 'Вы заработали 10 SHIFT!';
  }, 2000); // Через 2 секунды появляется сообщение о выигрыше
});