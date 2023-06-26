import { argv } from 'node:process';

export function getUserName() {
  const lastArg = argv[argv.length - 1];
  let name = '';

  for (let i = 0; i < lastArg.length; i += 1) {
    if (lastArg[i] === '=') {
      if (name === '--username') {
        name = '';
        continue;
      }
      throw new Error('Incorrect username fild');
    };
    name += lastArg[i];
  }

  return name;
}
