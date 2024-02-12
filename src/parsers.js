import { readFileSync } from 'fs';
import { cwd } from 'process';
import path from 'path';
import yaml from 'js-yaml';

const parse = (filepath) => {
  const fullPath = path.resolve(cwd(), filepath);
  const data = readFileSync(fullPath, 'utf-8');
  const extname = path.extname(fullPath);

  switch (extname) {
    case '.json':
      return JSON.parse(data);
    case '.yml':
    case '.yaml':
      return yaml.load(data);
    default:
      throw new Error(`Unsupported file extention (${extname})! [Supported: .json, .yml, .yaml]`);
  }
};

export default parse;
