document.getElementById('openBtn').addEventListener('click', async () => {
  const res = await fetch('/open-case', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  const data = await res.json();
  document.getElementById('result').innerText =
    `Выпало: ${data.item.name} [${data.item.rarity}]`;
});