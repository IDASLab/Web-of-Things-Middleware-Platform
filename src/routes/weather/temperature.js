const express = require('express');
const router = express.Router();
const resources = require('../../resources/model');


// Route '/': Get weather resource status
router.get('/', (req, res, next) => {
    let weatherInfo = resources.pi.sensors;
    res.status(200).send({
        status: "successed",
        massage: "Weather Resource Status",
        info: {
            Temperature: weatherInfo.temperature.name,
            Humidity: weatherInfo.humidity.name,
        }
    });
});


// Route '/temperature': Get Temprature Statues 
router.route('/temperature').get((req, res) => {
    let tempInfo = resources.pi.sensors.temperature;
    res.status(200).send({
        status: "successed",
        massage: "Temprature Sensor Status",
        info: {
            name: tempInfo.name,
            value: tempInfo.value,
            unit: tempInfo.unit,
        }
    });
});


// Route '/critical': Get and Update critical temperature value
router.route('/temperature/critical')
        .get((req, res) => {
            let tempInfo = resources.pi.sensors.temperature
            res.status(200).send({
                status: "successed",
                massage: "Temprature Critical Value",
                info: {
                    name: tempInfo.name,
                    critical: tempInfo.critical,
                    unit: tempInfo.unit,
                }
            })
        })
        .put((req, res) => {
            let tempInfo = resources.pi.sensors.temperature;
            resources.pi.sensors.temperature.critical = req.body.value;
            res.status(200).send({
                status: "successed",
                massage: "Temprature Critical Value is updated!",
                info: {
                    name: tempInfo.name,
                    critical: tempInfo.critical,
                    unit: tempInfo.unit,
                }
            });
        });


// Route '/': Get humidity status 
router.get('/humidity', (req, res) => {
    let humInfo = resources.pi.sensors.humidity;
    res.status(200).send({
        status: "successed",
        massage: "Humidity Sensor Status",
        info: {
            name: humInfo.name,
            value: humInfo.value,
            unit: humInfo.unit,
        }
    });
 });        

module.exports = router;
