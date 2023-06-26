export function getOperation(line) {
  let operator = '';

  for (let i = 0; i < line.length; i += 1) {
    if (line[i] === ' ') break;
    operator += line[i];
  }

  return operator;
}
