import os from 'os';
import { getCmdChunk } from '../file-manager.js';

export default async function getOSInfo (input) {
  if (getCmdChunk(input, 1, 2, true) == '--EOL') {
    console.log(os.EOL.split(''));
  } else if (getCmdChunk(input, 1, 2, true) == '--cpus') {
    console.log(`Overal amount: ${os.cpus().length}`);
    os.cpus().forEach(cp => {
      console.log(`Model: ${cp.model.split('CPU')[0]}\nClock rate: ${(cp.speed / 1000).toFixed(2)} GHz`)
    });
  } else if (getCmdChunk(input, 1, 2, true) == '--homedir') {
    console.log(os.homedir());
  } else if (getCmdChunk(input, 1, 2, true) == '--username') {
    console.log(os.userInfo().username);
  } else if (getCmdChunk(input, 1, 2, true) == '--architecture') {
    console.log(os.arch());
  } else {
    console.log('Invalid input\n');
  }
}