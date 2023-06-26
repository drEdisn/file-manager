import fs from 'fs/promises';
import path from 'path';
import { currentDir as home } from '../common/currentDir.js';
import { getCmdChunk } from '../common/getCmdChunk.js';

export default async function removeFile(input) {
  const [ filePath ] = getCmdChunk(input);

  await fs.rm(path.join(home.dir, filePath))
  .then(() => {
    console.log('Removing file successfully\n');
  }).catch(() => {
    console.log('Operation failed\n');
  })
}
