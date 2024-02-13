import parse from './parsers.js';
import diffConstructor from './diffConstructor.js';
import format from './formatters/index.js';

const genDiff = (filepath1, filepath2, formatType = 'stylish') => {
  const file1 = parse(filepath1);
  const file2 = parse(filepath2);
  const diff = diffConstructor(file1, file2);

  return format(diff, formatType);
};

export default genDiff;
