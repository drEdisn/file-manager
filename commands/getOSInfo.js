import os from 'os';
import { getCmdChunk } from '../common/getCmdChunk.js';

const operations = Object.freeze({
  '--EOL': () => {
    console.log(os.EOL.split(''));
  },
  '--cpus': () => {
    console.log(`Overal amount: ${os.cpus().length}`);
    os.cpus().forEach(cp => {
      console.log(
        `Model: ${cp.model.split('CPU')[0]}\nClock rate: ${(cp.speed / 1000).toFixed(2)} GHz`,
      );
    });
  },
  '--homedir': () => {
    console.log(os.homedir());
  },
  '--username': () => {
    console.log(os.userInfo().username);
  },
  '--architecture': () => {
    console.log(os.arch());
  },
});

export default async function getOSInfo (input) {
  const [ option ] = getCmdChunk(input);

  if (operations[option]) {
    operations[option]();
  } else {
    console.log('Invalid input\n');
  }
}
