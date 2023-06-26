import fs from 'fs/promises';
import path from 'path';
import { currentDir as home } from '../common/currentDir.js';
import { getCmdChunk } from '../common/getCmdChunk.js';

async function renameFile(input) {
  const [ secondPath, firstPath ] = getCmdChunk(input, 2);
  await fs.rename(
    path.join(home.dir, firstPath),
    path.join(home.dir, path.dirname(firstPath), secondPath)
  )
  .then(() => {
    console.log('Renaming file successfully\n');
  }).catch(() => {
    console.log('Operation failed\n');
  })
}

async function moveFile(input) {
  const [ secondPath, firstPath ] = getCmdChunk(input, 2);
  await fs.rename(
    path.join(home.dir, firstPath),
    path.join(home.dir, secondPath, path.basename(firstPath))
  )
  .then(() => {
    console.log('Moving file successfully\n');
  }).catch(() => {
    console.log('Operation failed\n');
  })
}

export {renameFile, moveFile};
