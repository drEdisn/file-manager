import crypto from 'crypto';
import path from 'path';
import fs from 'fs/promises';
import { homeDir as home, getCmdChunk } from "../file-manager.js";

export default async function calcHash (input) {
  try {
    const file = await fs.readFile(
      path.join(home.data, getCmdChunk(input, 1)),
      'utf-8'
    );
    const newHash = crypto.createHash('sha256');
    newHash.update(file);
    console.log(newHash.digest('hex'));
  } catch {
    console.log('Operation failed\n')
  }
}