import { createReadStream } from 'fs';
import fs from 'fs/promises';
import path from 'path';
import { homeDir as home, getCmdChunk } from "../file-manager.js";

async function readFileToPach (input) {
  try {
    const src = path.join(home.data, getCmdChunk(input, 1));
    const stream = createReadStream(src, 'utf-8');
    for await (let chunk of stream) {
      console.log(chunk);
    }
  } catch {
    console.log('Operation failed\n');
  }
}

async function createNewFile (input) {
  await fs.writeFile(path.join(home.data, getCmdChunk(input, 1)), '')
  .then(() => {
    console.log('Creating file successfully\n');
  }).catch(() => {
    console.log('Operation failed\n');
  })
}

export {readFileToPach, createNewFile};