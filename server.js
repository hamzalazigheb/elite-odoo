const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const { spawn } = require('child_process');
const fs = require('fs');

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

        // Trigger Jenkins job with REPO_URL parameter and crumb
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

        // Execute Python script
        const pythonScriptPath = '/home/hamzalazigheb/Desktop/hamza'; // Path to your Python script
        const pythonProcess = spawn('python3', [pythonScriptPath, 'arguments']);

        let imageData = Buffer.alloc(0);

        pythonProcess.stdout.on('data', (data) => {
            // Concatenate the chunks of image data
            imageData = Buffer.concat([imageData, data]);
        });

        pythonProcess.stderr.on('data', (data) => {
            console.error(`Python script stderr: ${data}`);
        });

        pythonProcess.on('close', (code) => {
            console.log(`Python script process exited with code ${code}`);

            // Write the image data to a temporary file
            const tempImagePath = '/tmp/output_image.png';
            fs.writeFile(tempImagePath, imageData, (err) => {
                if (err) {
                    console.error('Error writing image file:', err);
                    return res.status(500).json({ error: 'Failed to save image file' });
                }

                // Send the image file back to the client
                res.sendFile(tempImagePath, (err) => {
                    if (err) {
                        console.error('Error sending image file:', err);
                        return res.status(500).json({ error: 'Failed to send image file' });
                    }

                    // Cleanup: delete the temporary image file
                    fs.unlink(tempImagePath, (err) => {
                        if (err) {
                            console.error('Error deleting temporary image file:', err);
                        }
                    });
                });
            });
        });
    } catch (error) {
        console.error('Error triggering Jenkins job:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Failed to trigger Jenkins job' });
    }
});

// Start the Express server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
