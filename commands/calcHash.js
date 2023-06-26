import crypto from 'crypto';
import path from 'path';
import { createReadStream } from 'fs';
import { currentDir as home } from '../common/currentDir.js';
import { getCmdChunk } from '../common/getCmdChunk.js';

export default async function calcHash(input) {
  try {
    const [ filePath ] = getCmdChunk(input);
    const newHash = crypto.createHash('sha256');
    const src = path.join(home.dir, filePath);
    const stream = createReadStream(src, 'utf-8');
    for await (let chunk of stream) {
      newHash.update(chunk);
    }
    console.log(newHash.digest('hex'));
  } catch {
    console.log('Operation failed\n')
  }
}
