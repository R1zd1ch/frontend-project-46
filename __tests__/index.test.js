/* eslint-disable no-undef */
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { readFileSync } from 'fs';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

describe('Stylish Tests', () => {
  test('filejson', () => {
    const filepath1 = getFixturePath('file1.json');
    const filepath2 = getFixturePath('file2.json');
    const resultname = getFixturePath('expectedStylish.txt');
    const result = readFileSync(resultname, 'utf8');
    expect(gendiff(filepath1, filepath2)).toEqual(result);
  });
});

describe('YML Stylish Test', () => {
  test('fileyml', () => {
    const filepath1 = getFixturePath('file1.yml');
    const filepath2 = getFixturePath('file2.yml');
    const resultname = getFixturePath('expectedStylish.txt');
    const result = readFileSync(resultname, 'utf8');
    expect(gendiff(filepath1, filepath2)).toEqual(result);
  });
});

describe('YAML Stylish Test', () => {
  test('fileyaml', () => {
    const filepath1 = getFixturePath('file1.yaml');
    const filepath2 = getFixturePath('file2.yaml');
    const resultname = getFixturePath('expectedStylish.txt');
    const result = readFileSync(resultname, 'utf8');
    expect(gendiff(filepath1, filepath2)).toEqual(result);
  });
});

describe('json plain Test', () => {
  test('filejson', () => {
    const filepath1 = getFixturePath('file1.json');
    const filepath2 = getFixturePath('file2.json');
    const resultname = getFixturePath('expectedPlain.txt');
    const result = readFileSync(resultname, 'utf8');
    expect(gendiff(filepath1, filepath2, 'plain')).toEqual(result);
  });
});

describe('YML plain Test', () => {
  test('fileyml', () => {
    const filepath1 = getFixturePath('file1.yml');
    const filepath2 = getFixturePath('file2.yml');
    const resultname = getFixturePath('expectedPlain.txt');
    const result = readFileSync(resultname, 'utf8');
    expect(gendiff(filepath1, filepath2, 'plain')).toEqual(result);
  });
});

describe('YAML plain Test', () => {
  test('fileyaml', () => {
    const filepath1 = getFixturePath('file1.yaml');
    const filepath2 = getFixturePath('file2.yaml');
    const resultname = getFixturePath('expectedPlain.txt');
    const result = readFileSync(resultname, 'utf8');
    expect(gendiff(filepath1, filepath2, 'plain')).toEqual(result);
  });
});

describe('Errors tests', () => {
  test('Unsupported format type', () => {
    const filepath1 = getFixturePath('file1.yaml');
    const filepath2 = getFixturePath('file2.yaml');
    const badpath1 = getFixturePath('file1.txt');
    const badpath2 = getFixturePath('file2.txt');
    const extErr = new Error('Unsupported file extention (.txt)! [Supported: .json, .yml, .yaml]');
    expect(() => gendiff(filepath1, badpath2)).toThrow(extErr);
    expect(() => gendiff(badpath1, filepath2)).toThrow(extErr);
  });
});
