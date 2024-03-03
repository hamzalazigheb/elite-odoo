const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = 5500;

// Parse JSON bodies (as sent by API clients)
app.use(bodyParser.json());

app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/submit-form', async (req, res) => {
    const urlInput = req.body.urlInput;
    console.log('Received URL:', urlInput);

    // Jenkins job URL
    const jenkinsJobUrl = 'http://localhost:8080/job/Clonejob/buildWithParameters';

    try {
        // Fetch Jenkins crumb
        const crumbResponse = await axios.get('http://localhost:8080/crumbIssuer/api/json', {
            auth: {
                username: 'hamzalazigheb',
                password: '110c4a22d4f3533f341d7f6378fddc3fdd', // API TOKEN
            },
        });

        // Trigger Jenkins job with REPO_URL parameter annd crumb
        const response = await axios.post(jenkinsJobUrl, null, {
            params: {
                REPO_URL: urlInput,
            },
            headers: {
                'Jenkins-Crumb': crumbResponse.data.crumb,
            },
            auth: {
                username: 'hamzalazigheb',
                password: '110c4a22d4f3533f341d7f6378fddc3fdd', 
            },
        });

        console.log('Jenkins job triggered successfully:', response.data);

        res.json({
            message: 'Data received successfully!',
            data: urlInput,
            jenkinsResponse: response.data,
        });
    } catch (error) {
        console.error('Error triggering Jenkins job:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Failed to trigger Jenkins job' });
    }
});

// Start the Express server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}) ;