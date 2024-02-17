import { readFileSync } from 'fs';
import { cwd } from 'process';
import path from 'path';
import parse from './parsers.js';
import diffConstructor from './diffConstructor.js';
import format from './formatters/index.js';

const getRawData = (filepath) => {
  const fullPath = path.resolve(cwd(), filepath);
  return readFileSync(fullPath, 'utf-8');
};

const getFormat = (filepath) => path.extname(filepath).slice(1);

const genDiff = (filepath1, filepath2, formatType = 'stylish') => {
  const rawData1 = getRawData(filepath1);
  const rawData2 = getRawData(filepath2);
  const extName1 = getFormat(filepath1);
  const extName2 = getFormat(filepath2);
  const parsedData1 = parse(rawData1, extName1);
  const parsedData2 = parse(rawData2, extName2);
  const diff = diffConstructor(parsedData1, parsedData2);

  return format(diff, formatType);
};

export default genDiff;
