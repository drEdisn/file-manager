import os from 'node:os';

function getDir() {
  let currentDir = os.homedir();
  process.chdir(currentDir);

  return {
    dir: currentDir,
    getMessage() {
      console.log(`You are currently in ${this.dir}`);
    },
    change(value) {
      if (value) this.dir = value;
    }
  }
}

export const currentDir = getDir();
