import { getUserName } from './common/getUserName.js';
import { lineInputs, rl } from './common/lineInputs.js';
import { currentDir } from './common/currentDir.js';
import { getOperation } from './common/getOperation.js';

const user = getUserName();
console.log(`Welcome to the File Manager, ${user}!`);
currentDir.getMessage();

rl.on('line', async (line) => {
  const operator = getOperation(line);

  if (lineInputs[operator]) {
    await lineInputs[operator](line);
  } else {
    console.log('Invalid input');
  }

  currentDir.getMessage();
});

rl.on('close', () => console.log(`Thank you for using File Manager, ${user}!`));
