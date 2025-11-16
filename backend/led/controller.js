import { arduino } from '../arduino/connection.js';

const turnOnLED = async (req, res) => {

  if (!arduino) {
    return res.status(503).send('Serial not available');
  }

  arduino.write('1', (err) => {
    if (err) {
      return res.status(500).send('Error turning on LED');
    }
    console.log('Sending response: LED is ON');
    res.send('LED is ON');
  });
};

const turnOffLED = async (req, res) => {
  
  if (!arduino) {
    return res.status(503).send('Serial not available');
  }

  arduino.write('0', (err) => {
    if (err) {
      return res.status(500).send('Error turning off LED');
    }
    console.log('Sending response: LED is OFF');
    res.send('LED is OFF');
  });
};

export default {
    turnOnLED,
    turnOffLED
};