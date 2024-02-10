import _ from 'lodash';
import { readFileSync } from 'fs';
import { cwd } from 'process';
import path from 'path';

const getPath = (filename) => path.resolve(cwd(), filename);

// const getFileFormat = (filename) => path.extname(filename).slice(1);

const readFile = (filepath) => readFileSync(filepath, 'utf8');

const parseJson = (file) => JSON.parse(readFile(getPath(file)));

const genDiff = (filepath1, filepath2) => {
  const json1 = parseJson(filepath1);
  const json2 = parseJson(filepath2);

  const sortedAllKey = _.sortBy(_.union(Object.keys(json1), Object.keys(json2)));
  const diffsArray = sortedAllKey.map((key) => {
    const isKeyInJson1 = _.has(json1, key);
    const isKeyInJson2 = _.has(json2, key);
    if (isKeyInJson1 && !isKeyInJson2) {
      return `  - ${key}: ${json1[key]}`;
    }
    if (!isKeyInJson1 && isKeyInJson2) {
      return `  + ${key}: ${json2[key]}`;
    }
    if (isKeyInJson1 && isKeyInJson2 && json1[key] === json2[key]) {
      return `    ${key}: ${json1[key]}`;
    }
    return `  - ${key}: ${json1[key]}\n  + ${key}: ${json2[key]}`;
  });
  return ['{', ...diffsArray, '}'].join('\n');
};

export default genDiff;
