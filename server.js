const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const fs = require('fs');
const app = express();
const WebSocket = require('ws').Server;
var WebSocketClient = require('websocket').client;

const port = 5500;
const server = new WebSocket({
    server: app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    })
});

// Parse JSON bodies (as sent by API clients)
app.use(express.static(__dirname + '/'));
app.use(bodyParser.json());
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.set('views', __dirname);

let ws = [];

server.on('connection',(socket)=>{
    ws.push(socket);
    socket.on('message', function(msg) {
        try{ws.forEach(i=>i.send(msg.toString()))}catch(e){}
    });
})

app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/show-data',async(req,res)=>{
    var data = await  new Promise((res,_)=>{
        fs.readFile('data.json',{encoding:'utf-8'},(_,data)=>res(data));
    });
    res.render("data.html",{data})
})

app.post('/report', async (req,res)=>{
    console.log("going to send data to ws");
    var client = new WebSocketClient();
    client.connect('ws://localhost:5500/'); 
    client.on('connect',(connection)=>connection.send(JSON.stringify(req.body),(er)=>console.log(er)))
    // fs.writeFile('data.json', JSON.stringify(req.body), err => {});
    res.send();
})

app.get('/ping',(req,res)=>res.send("pong"))

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
