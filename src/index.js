import _ from 'lodash';
import parse from './parsers.js';

const genDiff = (filepath1, filepath2) => {
  const file1 = parse(filepath1);
  const file2 = parse(filepath2);

  const sortedAllKey = _.sortBy(_.union(Object.keys(file1), Object.keys(file2)));
  const diffsArray = sortedAllKey.map((key) => {
    const isKeyInJson1 = _.has(file1, key);
    const isKeyInJson2 = _.has(file2, key);
    if (isKeyInJson1 && !isKeyInJson2) {
      return `  - ${key}: ${file1[key]}`;
    }
    if (!isKeyInJson1 && isKeyInJson2) {
      return `  + ${key}: ${file2[key]}`;
    }
    if (isKeyInJson1 && isKeyInJson2 && file1[key] === file2[key]) {
      return `    ${key}: ${file1[key]}`;
    }
    return `  - ${key}: ${file1[key]}\n  + ${key}: ${file2[key]}`;
  });
  return ['{', ...diffsArray, '}'].join('\n');
};

export default genDiff;
