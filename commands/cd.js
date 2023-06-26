import path from 'path';
import fs from 'fs/promises';
import os from 'os';
import { currentDir as home } from '../common/currentDir.js';
import { getCmdChunk } from '../common/getCmdChunk.js';

async function changeDir (input) {
  const [ filePath ] = getCmdChunk(input);
  let resultPath = '';
  if (/^[a-zA-Z]:\\/.test(filePath)) {
    resultPath = path.join(filePath);
    const check = filePath.toLowerCase().startsWith(os.homedir().toLowerCase());

    if (!check) {
      console.log('Operation failed\n');
      return;
    }
  } else {
    resultPath = path.join(home.dir, filePath);
  }

  await fs.access(resultPath)
  .then(() => {
    home.change(resultPath);
    return process.chdir(resultPath);
  })
  .catch(() => console.log('Operation failed\n'))
}

async function getUpDir () {
  if (home.dir == os.homedir()) {
    console.log('You are in the root directory\n');
  } else {
    home.change(path.dirname(home.dir));
    process.chdir(home.dir);
  }
}

async function getDirList () {
  await fs.readdir(home.dir)
  .then(async (files) => {
    const res = [];
    for await (let file of files) {
      const checker = await fs.lstat(path.resolve(home.dir, file));
      const typeName = checker.isFile() ? 'file' : 'directory';
      const item = {
        Name: file,
        Type: typeName,
      };
      res.push(item);
    }

    console.table(res, ['Name', 'Type']);
  })
  .catch(() => console.log('Operation failed\n'));
}

export { changeDir, getUpDir, getDirList };
