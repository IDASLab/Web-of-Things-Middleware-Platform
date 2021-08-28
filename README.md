# Web of Things Middleware Platform #
WoT Project is a Web of Things middleware platform that turns a Raspberry-Pi to a WoT server. The main target of this project is to run and test WoT architecture on a simulated smart home scenario. This sample code tries to implement some basic functionalities of Smart Home application including climate, lighting and security controlling and monitoring.

## Table of Contents ##

## Requirements ##
At first step, you need to prepare some kind of requirements to run this code.
Requrments of this project are devided into Hardware and Software as below.

### Hardware Requirments
* [Raspberry-Pi 3](https://www.raspberrypi.org/products/raspberry-pi-3-model-b/)  Model B or B+
* [DHT11/22](https://learn.adafruit.com/dht) sensor
* [PIR](https://learn.adafruit.com/pir-passive-infrared-proximity-motion-sensor/how-pirs-work) motion sesnsor
* Some LEDs in colors of Red, Green, Blue

### Software Requirments
Since this code should run on Raspberry-Pi, the following softwares have to install on Raspberry. It is strongly recomdended to use [Raspbian](https://www.raspberrypi.org/software/operating-systems/) as main OS on Raspberry-Pi.

* [Node.js](https://nodejs.org/en/download/)
* Driver [bcm2835](https://www.airspayce.com/mikem/bcm2835/)

## Installaion
When your preparing requirments is done, you can clone this repository on your on Raspberry-Pi and setup hardware and software.

### Hardware Setup
To setup your hardwares on Raspberry-Pi, follow this instruction according to [schematic picture](?):
1. Open a [Raspberry-Pi pinout](https://www.raspberrypi-spy.co.uk/2012/06/simple-guide-to-the-rpi-gpio-header-and-pins/) to guide you that which pin has what number. Also the pinout of [DHT11](https://components101.com/sensors/dht11-temperature-sensor) and [PIR](https://components101.com/sensors/hc-sr501-pir-sensor) motion sesnor would be helpful.

2. Connect 5v VCC and GND pins of Raspberry-Pi to power rails of breadboard.

3. Set the DHT11 on the breadboard and connect its VCC and GND pins to power rails of breadbaord. Then Connect DHT11 pin-2 to GPIO-14 of Raspberry-Pi. 
   * Important Note: Do not forget that connect a pull-up resistor to pin 2 of DHT11. Otherwise, your sensor don't work properly.

4. Connect GPIOs 25, 8, 7 to positive leg of your LEDs, respectively. Then connect negative LEDs legs by resistor to GND of breadboard power rails.

5. In the same way, connect alert LED to GPIO 20.

6. Connect VCC and GND pins of PIR sensor to power rails. Then according to pic (), connect positive leg of PIR LED with a resistor to power rails and then connect  negative leg to PIR Data pin and GPIO 21. Note that PIR LED should be sitted between the Data pin of PIR sensor and Raspberry-Pi GPIO.

7. Congratulation, Your hardware is ready! :clap: :dancer:

![The Schematic of Hardware assembling](http://via.placeholder.com/200x150 "Web of Things Hardware Schematic")

### Software Setup

1. Clone this repository into your Raspberry-Pi.

2. Open terminal in direction of this repository.

3. Install dependencies by running this script: `npm install --save`

4. Run the code by: ` sudo npm run dev` or `sudo node main.js`
    * __Note__: This code must run in administrator mode. So, *don't forget using `sudo`*.

5. If the application works well and perfect, you should see some kind of result on terminal screen.
        
    ![The Promised Running Result](./docs/running_app_status.png "Running Result")

6. Now open your browser, on the Raspberry- Pi or on the other device on the same network, to to test the program by entering this API: `http://Raspberry_IP:8080/` and get result as below:


Your first WoT application is running on the Raspberry-Pi. Please feel free to change the code and hardware to make your favorite WoT project. If you properly desgin some front-end for this back-end code, please let us to know.

### Configuration

To configure hardware or sotfware, you should modify `resources.json` file in `src/resources/`. This file enable you to modify port number, sensors, and acuators information. 

## API End-Point
The below table lists all APIs that you can use to interact with WoT Middleware Platform. We recommend to use [Postman](https://www.postman.com/downloads/) or any similar options like `curl`, `axios` or etc. to use these APIs to create requests.

HTTP Verb |API                            | Request Body Value  | Description   
----------|-------------------------------| --------------------|------------
GET       |/                              | {}                   | Index
GET       |/pi                            | {}                   | Get Reaspberry-Pi status
GET       |/weather                       | {}                   | Get weather resource status
GET       |/weather/temperature           | {}                   |Get temprature status
GET       |/weather/temperature/critical  | {}                   | Get critical temperature value
PUT       |/weather/temperature/critical  | {"value": #number}   | Update critical temperature value
GET       |/weather/humidity              | {}                   | Get humidity status
GET       |/lighting                      | {}                   | Get lighting resources status
GET       |/lighting/id                   | {}                   | Get LED value by id
PUT       |/lighting/id                   | {"value" = true}     | Update LED value by id
GET       |/security                      | {}                   | Get security resources status
GET       |/security/motion_detector      | {}                   | Get motion detector status
GET       |/security/motion_detector/lock | {}                   | Get motion security lock
PUT       |/security/motion_detector/lock | {"value": true}      | Update motion security lock
GET       |/security/motion_detector/log  | {}                   | Downlaod motion sesnor recorded log

---

## Folder Structure



## System Architecture
As depicted on system architecture [picture](), The main architecture of this system include three major layer as Application, Middleware, and Things layer that each of them is responsible to support some functionalities of entire system. In following, we detail each layer.

### Application Layer

In application layer, vendor develpers can use APIs of this system to add, some or entire, system functionalities into their applications.

### Middleware Layer

The main goal of Middleware, in such IoT architecture, is to act like a intermediate layer between Application and Things layers. Middleware layer is responsible to make functionalitues of devices accessible on applications. in summary, Middeware layer get the raw data from devices by using hardware or software conncetor (GPIOs or network connection) and turn them into some high level (bussiness) services. Technically, there are many types of middlewares that could be used in the IoT architecture such as, event-based, VM-based, or etc. However, we leverage [Web of Things](https://webofthings.org/) to create our Middleware layer. The arhitecture of Web of Things uses fundamental and technical Web technologies to develop such IoT applications that would be used in many scenarios. Therefore, we use Node.js by Express framework to develop our WoT Middleware Platform on Raspberry-Pi.

### Things Layer

Things layer is such devices or sensors that we used in our work. In this system, Raspberry-Pi as main server, is enable us to connect these sensors (DHT11 and PIR) and acutators (LEDs) directly by usnig some GPIOs.


![Architecture of WoT Middleware Platform](http://via.placeholder.com/200x150 "System Architecture")

## Folder Structure



## Learn More!