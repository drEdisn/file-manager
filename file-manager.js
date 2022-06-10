import * as readline from 'readline';
import os from 'os';
import { changeDir, getUpDir, getDirList } from './commands/nwd.js';
import getOSInfo from './commands/os-info.js';
import {
  createNewFile,
  readFileToPach, 
  renameFile,
  moveFile, 
  delFile} from './commands/file-command.js';
import path from 'path';
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

// create stream variable
const input = process.stdin;
const output = process.stdout;
const rl = readline.createInterface({input, output});

// get console input in chunks 
const getCmdChunk = (inp, from, to) => inp.split(' ').slice(from, to).join(' ');

// check command line and start function
rl.on('line', async (input) => {
  if (getCmdChunk(input, 0, 1) == 'cd') {
    await changeDir(input, getCmdChunk);
  } else if (getCmdChunk(input, 0, 1) == 'up') {
    await getUpDir();
  } else if (getCmdChunk(input, 0, 1) == 'ls') {
    await getDirList();
  } else if (getCmdChunk(input, 0, 1) == 'os') {
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
  } else if (input == 'close') {
    await rl.close();
  } else {
    console.log('Invalid input\n');
  }

  console.log(`You are currently in ${process.cwd()}`);
  console.log('Write command here:');
})

rl.on('close', () => console.log(`Thank you for using File Manager, ${user}!`));

export { homeDir, getCmdChunk };