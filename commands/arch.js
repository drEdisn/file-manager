import zlib from 'zlib';
import path from 'path';
import fs from 'fs';
import { homeDir as home, getCmdChunk } from "../file-manager.js";

export default async function newArch (input, bool) {
  try {
    const src =  fs.createReadStream(path.join(home.data, getCmdChunk(input, 1, 2)));
    const dest = fs.createWriteStream(path.join(home.data, getCmdChunk(input, 2)));
    
    if (bool) {
      src.pipe(zlib.createBrotliCompress()).pipe(dest);
    } else {
      src.pipe(zlib.createBrotliDecompress()).pipe(dest);
    }
  } catch {
    console.log('Operation failed\n');
  }
}