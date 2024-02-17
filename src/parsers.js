import yaml from 'js-yaml';

const parse = (data, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(data);
    case 'yml':
    case 'yaml':
      return yaml.load(data);
    default:
      throw new Error(`Unsupported file extention (${format})! [Supported: .json, .yml, .yaml]`);
  }
};

export default parse;
