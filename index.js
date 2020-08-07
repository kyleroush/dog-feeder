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

    motor.servoWrite(1000)

    setTimeout(function(){ motor.servoWrite(0) }, req.body.time);


    res.json(req.body)
})

app.post('/skip', (req, res) => {

    // motor.servoWrite(1000)

    // setTimeout(function(){ motor.servoWrite(0) }, 1000);

    toSkip = true
    res.json(req.body)
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

 
cron.schedule('0 8,18,20 * * *', () => {
    if (toSkip) {
        toSkip =false;
        return;
    }
  
    motor.servoWrite(1000)

    setTimeout(function(){ motor.servoWrite(0) }, 700);
});