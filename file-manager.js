import * as readline from 'readline';
import os from 'os';
import { changeDir, getUpDir, getDirList } from './commands/nwd.js';
import getOSInfo from './commands/os-info.js';
import {createNewFile, readFileToPach} from './commands/read-add-file.js';
import delFile from './commands/remove-file.js';
import { moveFile, renameFile } from './commands/move-file.js';
import calcHash from './commands/hash.js';
import newArch from './commands/arch.js';

const user = process.argv.find(i => i.includes('--username')).split('=')[1];
console.log(`Welcome to the File Manager, ${user}!`);

// current directory object
let homeDir = {
  data: os.homedir(),
  change(prop) {
    return this.data = prop;
  }
};

process.chdir(homeDir.data);
console.log(`You are currently in ${homeDir.data}`);
console.log('Write command here (WARNING! path sould be start with ./ ):');
console.log('EXAMPLE: rn ./Desktop/text.txt ./newtext.txt');

// create stream variable
const input = process.stdin;
const output = process.stdout;
const rl = readline.createInterface({input, output});

// get console input in chunks 
const getCmdChunk = (inp, from, to, os) => {return inp.split(`${os ? ' ' : ' ./'}`).slice(from, to).join(' ')};

// check command line and start function
rl.on('line', async (input) => {
  if (getCmdChunk(input, 0, 1) == 'cd') {
    await changeDir(input, getCmdChunk);
  } else if (getCmdChunk(input, 0, 1) == 'up') {
    await getUpDir();
  } else if (getCmdChunk(input, 0, 1) == 'ls') {
    await getDirList();
  } else if (getCmdChunk(input, 0, 1, true) == 'os') {
    await getOSInfo(input);
  } else if (getCmdChunk(input, 0, 1) == 'cat') {
    await readFileToPach(input);
  } else if (getCmdChunk(input, 0, 1) == 'add') {
    await createNewFile(input);
  } else if (getCmdChunk(input, 0, 1) == 'rn') {
    await renameFile(input);
  } else if (getCmdChunk(input, 0, 1) == 'mv') {
    await moveFile(input);
  } else if (getCmdChunk(input, 0, 1) == 'rm') {
    await delFile(input);
  } else if (getCmdChunk(input, 0, 1) == 'hash') {
    await calcHash(input);
  } else if (getCmdChunk(input, 0, 1) == 'compress') {
    await newArch(input, true);
  } else if (getCmdChunk(input, 0, 1) == 'decompress') {
    await newArch(input, false);
  } else if (input == '.exit') {
    rl.close();
  } else {
    console.log('Invalid input\n');
  }

  console.log(`You are currently in ${process.cwd()}`);
  console.log('Write command here (WARNING! path sould be start with ./ ):');
})

rl.on('close', () => console.log(`Thank you for using File Manager, ${user}!`));

export { homeDir, getCmdChunk };
