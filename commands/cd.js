import path from 'path';
import fs from 'fs/promises';
import os from 'os';
import { currentDir as home } from '../common/currentDir.js';
import { getCmdChunk } from '../common/getCmdChunk.js';

function getResultPath(filePath) {
  if (/^[a-zA-Z]:\\/.test(filePath)) {
    return path.join(filePath);
  }

  return path.join(home.dir, filePath);
}

function checkForRoot(resultPath) {
  const lowerResult = resultPath.toLowerCase();
  const lowerHomedir = os.homedir().toLowerCase();

  if (!lowerResult.startsWith(lowerHomedir)) {
    return false;
  }

  return true;
}

async function changeDir (input) {
  const [ filePath ] = getCmdChunk(input);
  let resultPath = getResultPath(filePath);
  const isRoot = checkForRoot(resultPath);
  if (!isRoot) return console.log('Operation failed\n');

  await fs.access(resultPath)
  .then(() => {
    home.change(resultPath);
    return process.chdir(resultPath);
  })
  .catch(() => console.log('Operation failed\n'))
}

async function getUpDir () {
  if (home.dir.toLowerCase() === os.homedir().toLowerCase()) {
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
