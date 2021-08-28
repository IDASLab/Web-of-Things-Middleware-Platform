const express = require('express');
const router = express.Router();
const resources = require('../../resources/model')


//Index Route
router.get('/', (req, res) => {
    res.status(200).send({
        status: "successed",
        massage: "P02.WoT Project is running successfully!",
        info: "This project is define to develop and test the Web of Things Middleware platform."
    });
});


// Route '/pi': Get Reaspberry-Pi Status
router.get('/pi', (req, res) => {
    let PiInfo = resources.pi;
    res.status(200).send({
        status: "successed",
        massage: "Reaspberry-Pi Status",
        info: {
            name: PiInfo.name,
            port: PiInfo.port,
            sensors: PiInfo.sensors,
            actuators: PiInfo.actuators
        }
    });
});

module.exports = router;