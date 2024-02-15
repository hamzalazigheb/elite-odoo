const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 5500; // Change this to your desired port

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/submit-form', (req, res) => {
  // Extract Git repository URL from the request body
  const gitRepoUrl = req.body.urlInput;

  // Log the Git repository URL to the console
  console.log(`Git Repository URL: ${gitRepoUrl}`);

  // Add your logic here to trigger Jenkins build or any other action
  // For demonstration purposes, we'll respond with a success message
  res.json({ success: true, message: 'Form submitted successfully!' });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
