const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const events = [];

app.post("/events", (req, res) => {
    const event = req.body;

    events.push(event);

    axios.post('http://localhost:4000/events', event).catch((err) => { console.error(err.message); });
    axios.post('http://localhost:4001/events', event).catch((err) => { console.error(err.message); });
    axios.post('http://localhost:4002/events', event).catch((err) => { console.error(err.message); });
    axios.post('http://localhost:4003/events', event).catch((err) => { console.error(err.message); });

    res.status(200).send({ status: "OK" });
});

//getting all the events
app.get("/events", (req, res) => {
    res.send(events);
});

app.listen(4005, () => {
    console.log("Event bus server running on port 4005");
});