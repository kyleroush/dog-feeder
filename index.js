const express = require('express')
const Gpio = require('pigpio').Gpio
const app = express()
const port = 3000

const motor = new Gpio(17, {mode: Gpio.OUTPUT}) 

app.post('/feed', (req, res) => {

    motor.servoWrite(1000)

    setInterval(function(){ motor.servoWrite(0) }, 1000);


    res.send('Hello World!')
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))