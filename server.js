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

    // Update with your Jenkins job URL and token
    const jenkinsUrl = 'http://localhost:8080/job/CloneJob/buildWithParameters?token=111c969c32614ffe81093010cec04b6cfd';

    try {
        const jenkinsResponse = await axios.post(jenkinsUrl, null, {
            headers: {
                'Authorization': 'Basic ' + Buffer.from('hamzalazigheb:' + '111c969c32614ffe81093010cec04b6cfd').toString('base64'),
            },
            params: {
                urlParameter: urlInput,
            },
        });

        console.log('Jenkins job triggered successfully:', jenkinsResponse.data);
        res.json({ message: 'Data received successfully!', data: urlInput });
    } catch (error) {
        console.error('Error triggering Jenkins job:', error.message);
        res.status(500).json({ error: 'Failed to trigger Jenkins job' });
    }
});

// Start the Express server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
