const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('🚀 CI/CD with Jenkins and Docker is working!');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

