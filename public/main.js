document.getElementById('qa-form').addEventListener('submit', async function (e) {
  e.preventDefault();
  const carModel = document.getElementById('carModel').value;
  const question = document.getElementById('question').value;
  const resultDiv = document.getElementById('result');
  resultDiv.style.display = 'block';
  resultDiv.textContent = 'Loading...';

  try {
    const response = await fetch('/api/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ carModel, question })
    });
    const data = await response.json();
    resultDiv.textContent = data.answer || data.error || 'No answer received.';
  } catch (err) {
    resultDiv.textContent = 'Error: ' + err.message;
  }
});

document.getElementById('proscons-form').addEventListener('submit', async function (e) {
  e.preventDefault();
  const carModel = document.getElementById('proscons-carModel').value;
  const resultDiv = document.getElementById('proscons-result');
  resultDiv.style.display = 'block';
  resultDiv.textContent = 'Loading...';

  try {
    const response = await fetch('/api/proscons', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ carModel })
    });
    const data = await response.json();
    if (data.summary && typeof data.summary === 'object' && data.summary.pros && data.summary.cons) {
      resultDiv.innerHTML =
        '<strong>Pros:</strong><ul>' +
        data.summary.pros.map(item => `<li>${item}</li>`).join('') +
        '</ul>' +
        '<strong>Cons:</strong><ul>' +
        data.summary.cons.map(item => `<li>${item}</li>`).join('') +
        '</ul>';
    } else {
      resultDiv.textContent = data.summary || data.error || 'No summary received.';
    }
  } catch (err) {
    resultDiv.textContent = 'Error: ' + err.message;
  }
});
