import arduino from '../arduino/connection.js';

const turnOnLED = async (req, res) => {
  arduino.write('1', (err) => {
    if (err) {
      return res.status(500).send('Error turning on LED');
    }
    res.send('LED is ON');
  });
};

const turnOffLED = async (req, res) => {
  arduino.write('0', (err) => {
    if (err) {
      return res.status(500).send('Error turning off LED');
    }
    res.send('LED is OFF');
  });
};

export default {
    turnOnLED,
    turnOffLED
};