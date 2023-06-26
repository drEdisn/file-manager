import zlib from 'zlib';
import path from 'path';
import fs from 'fs';
import { currentDir as home } from '../common/currentDir.js';
import { getCmdChunk } from '../common/getCmdChunk.js';

export default async function getZlib(input, isCompress = true) {
  try {
    const [secondFile, firstFile] = getCmdChunk(input, 2);
    const src =  fs.createReadStream(path.join(home.dir, firstFile));
    const dest = fs.createWriteStream(path.join(home.dir, secondFile));

    if (isCompress) {
      src.pipe(zlib.createBrotliCompress()).pipe(dest);
      console.log('Successfully compressed');
    } else {
      src.pipe(zlib.createBrotliDecompress()).pipe(dest);
      console.log('Successfully decompressed');
    }
  } catch {
    console.log('Operation failed\n');
  }
}
