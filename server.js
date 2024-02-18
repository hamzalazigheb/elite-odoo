const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 5500;

// Parse JSON bodies (as sent by API clients)
app.use(bodyParser.json());

app.use(express.static(__dirname));


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});


app.post('/submit-form', (req, res) => {
    const urlInput = req.body.urlInput;
    console.log('Received URL:', urlInput);

    
    res.json({ message: 'Data received successfully!',
  data : urlInput 
  
  });
});

// Start the Express server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
