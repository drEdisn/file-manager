export function getCmdChunk(line, chunks = 1) {
  let count = 0;
  const result = [];
  let currentValue = '';

  for (let i = line.length - 1; i >= 0; i -= 1) {
    if (line[i] === ' ') {
      if (currentValue) {
        result.push(currentValue);
        currentValue = '';
        count += 1;
      }
      continue;
    }
    if (count === chunks) break;
    currentValue = line[i] + currentValue;
  }
  return result;
}
