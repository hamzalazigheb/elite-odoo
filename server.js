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
    const { urlInput, sonarProjectName } = req.body; // Destructure request body
    
    console.log('Received URL:', urlInput);
    console.log('Received Sonar Project Name:', sonarProjectName);

    // Jenkins pipeline job URL
    const jenkinsJobUrl = 'http://localhost:8080/job/Scan/buildWithParameters';

    // Jenkins credentials
    const username = 'hamzalazigheb';
    const password = '110c4a22d4f3533f341d7f6378fddc3fdd'; // API token or password

    try {
        // Trigger Jenkins pipeline job with parameters
        const response = await axios.post(jenkinsJobUrl, null, {
            params: {
                REPO_URL: urlInput,
                SONAR_PROJECT_NAME: sonarProjectName
            },
            auth: {
                username,
                password,
            },
        });

        console.log('Jenkins pipeline job triggered successfully:', response.data);

        res.json({
            message: 'Data received successfully!',
            data: urlInput,
            sonarProjectName,
            jenkinsResponse: response.data,
        });
    } catch (error) {
        console.error('Error triggering Jenkins pipeline job:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Failed to trigger Jenkins pipeline job' });
    }
});

// Start the Express server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
