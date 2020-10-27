// Setup empty JS object to act as endpoint for all routes
let projectData = {
};

// Require Express to run server and routes

const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors')

// Start up an instance of app

const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors())

// Initialize the main project folder
app.use(express.static('website'))

// Setup Server
const server = app.listen(3000, () => { console.log('server running on localhost:  3000') })

app.get('/ProjectData', (req, res) => {
    res.send(projectData)
})

app.post('/projectData', (req, res) => {
    console.log(req.body)
    const { date, temp, content, humidity, speed } = req.body
    projectData = {
        date,
        temp,
        content,
        humidity,
        speed,
    }
})