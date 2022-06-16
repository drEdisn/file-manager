import fs from 'fs/promises';
import path from 'path';
import { homeDir as home, getCmdChunk } from "../file-manager.js";

export default async function delFile (input) {
  await fs.rm(path.join(home.data, getCmdChunk(input, 1)))
  .then(() => {
    console.log('Removing file successfully\n');
  }).catch(() => {
    console.log('Operation failed\n');
  })
}