import { SerialPort } from 'serialport';

const serialPath = 'COM5';
const arduino = new SerialPort({ path: serialPath, baudRate: 9600 });

arduino.on('open', () => {
  console.log(`Serial path ${serialPath} opened`);
});

export default arduino;
