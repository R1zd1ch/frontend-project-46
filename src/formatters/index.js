import stylish from './stylish.js';
import plain from './plain.js';

const format = (diff, formatType) => {
  switch (formatType) {
    case 'stylish':
      return stylish(diff);
    case 'plain':
      return plain(diff);
    case 'json':
      return JSON.stringify(diff);
    default:
      throw new Error(`Unsupported format type (${formatType})! [Supported: stylish, plain, json]`);
  }
};

export default format;
