import { stdin, stdout } from 'node:process';
import { createInterface } from 'node:readline';

import { changeDir, getUpDir, getDirList } from '../commands/cd.js';
import getOSInfo from '../commands/getOSInfo.js';
import { createNewFile, readFileToPach } from '../commands/readAddFile.js';
import removeFile from '../commands/removeFile.js';
import { moveFile, renameFile } from '../commands/moveFile.js';
import calcHash from '../commands/calcHash.js';
import getZlib from '../commands/getZlib.js';

export const rl = createInterface({
  input: stdin,
  output: stdout,
});

export const lineInputs = Object.freeze({
  '.exit': () => rl.close(),
  'cd': (input) => changeDir(input),
  'up': () => getUpDir(),
  'ls': () => getDirList(),
  'os': (input) => getOSInfo(input),
  'cat': (input) => readFileToPach(input),
  'add': (input) => createNewFile(input),
  'rn': (input) => renameFile(input),
  'mv': (input) => moveFile(input),
  'rm': (input) => removeFile(input),
  'hash': (input) => calcHash(input),
  'compress': (input) => getZlib(input, true),
  'decompress': (input) => getZlib(input, false),
});
