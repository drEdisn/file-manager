import path from 'path';
import fs from 'fs/promises';
import os from 'os';
import { homeDir as home } from '../file-manager.js';

async function changeDir (input, cmd) {
  await fs.access(path.join(home.data, cmd(input, 1)))
  .then(() => {
    let src = path.join(home.data, cmd(input, 1));
    home.change(src);
    return process.chdir(src);
  })
  .catch(() => console.log('Operation failed\n'))
}

async function getUpDir () {
  if (home.data == os.homedir()) {
    console.log('You are in the root directory\n');
  } else {
    home.change(path.dirname(home.data));
    process.chdir(home.data);
  }
}

async function getDirList () {
  await fs.readdir(home.data)
  .then(files => {
    files.forEach(file => {
      console.log(file);
    })
  }).catch(() => console.log('Operation failed\n'));
}

export { changeDir, getUpDir, getDirList };