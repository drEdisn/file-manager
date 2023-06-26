import { createReadStream } from 'fs';
import fs from 'fs/promises';
import path from 'path';
import { currentDir as home } from '../common/currentDir.js';
import { getCmdChunk } from '../common/getCmdChunk.js';

async function readFileToPach (input) {
  try {
    const [ filePath ] = getCmdChunk(input);
    const src = path.join(home.dir, filePath);
    const stream = createReadStream(src, 'utf-8');
    for await (let chunk of stream) {
      console.log(chunk);
    }
  } catch {
    console.log('Operation failed\n');
  }
}

async function createNewFile (input) {
  const [ filePath ] = getCmdChunk(input);
  await fs.writeFile(path.join(home.dir, filePath), '')
  .then(() => {
    console.log('Creating file successfully\n');
  }).catch(() => {
    console.log('Operation failed\n');
  })
}

export {readFileToPach, createNewFile};
