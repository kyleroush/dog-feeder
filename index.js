const express = require('express')
const Gpio = require('pigpio').Gpio
const app = express()
var cron = require('node-cron');

var path = require('path');
const port = 3000

const motor = new Gpio(17, {mode: Gpio.OUTPUT}) 

var toSkip = false

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/website.html'));

})
app.post('/feed', (req, res) => {

    feed(req.body.time, 1000)

    res.json(req.body)
})

app.post('/skip', (req, res) => {

    toSkip = true
    res.json({toSkip})
})

app.get('/skip', (req, res) => {

    res.json({toSkip})
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

 
const job = cron.schedule('0 8,18,20 * * *', () => {
    if (toSkip) {
        toSkip = false;
        console.log('skipping')
        return;
    }
  
    feed(700, 1000)
});

function feed(time, speed) {
    motor.servoWrite(speed)

    setTimeout(() => { motor.servoWrite(0) }, time);
}
