import crypto from 'crypto';
import path from 'path';
import { createReadStream } from 'fs';
import { homeDir as home, getCmdChunk } from "../file-manager.js";

export default async function calcHash (input) {
  try {
    const newHash = crypto.createHash('sha256');
    const src = path.join(home.data, getCmdChunk(input, 1));
    const stream = createReadStream(src, 'utf-8');
    for await (let chunk of stream) {
      newHash.update(chunk);
    }
    console.log(newHash.digest('hex'));
  } catch {
    console.log('Operation failed\n')
  }
}