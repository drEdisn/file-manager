import fs from 'fs/promises';
import path from 'path';
import { homeDir as home, getCmdChunk } from "../file-manager.js";

async function readFileToPach (input) {
  await fs.readFile(path.join(home.data, getCmdChunk(input, 1)), 'utf-8')
  .then(data => {
    console.log(data);
  }).catch(() => {
    console.log('Operation failed\n');
  })
}

async function createNewFile (input) {
  await fs.writeFile(path.join(home.data, getCmdChunk(input, 1)), '')
  .then(() => {
    console.log('Creating file successfully\n');
  }).catch(() => {
    console.log('Operation failed\n');
  })
}

async function renameFile (input) {
  await fs.rename(
    path.join(home.data, getCmdChunk(input, 1, 2)),
    path.join(home.data, path.dirname(getCmdChunk(input, 1, 2)), getCmdChunk(input, 2))
  )
  .then(() => {
    console.log('Renaming file successfully\n');
  }).catch(() => {
    console.log('Operation failed\n');
  })
}

async function moveFile (input) {
  await fs.rename(
    path.join(home.data, getCmdChunk(input, 1, 2)),
    path.join(home.data, getCmdChunk(input, 2), path.basename(getCmdChunk(input, 1, 2)))
  )
  .then(() => {
    console.log('Moving file successfully\n');
  }).catch(() => {
    console.log(path.basename(getCmdChunk(input, 1, 2)))
    console.log(path.join(home.data, path.dirname(getCmdChunk(input, 1, 2)), getCmdChunk(input, 2),path.basename(getCmdChunk(input, 1, 2))));
    console.log('Operation failed\n');
  })
}

async function delFile (input) {
  await fs.rm(path.join(home.data, getCmdChunk(input, 1)))
  .then(() => {
    console.log('Removing file successfully\n');
  }).catch(() => {
    console.log('Operation failed\n');
  })
}

export {readFileToPach, createNewFile, renameFile, moveFile, delFile};