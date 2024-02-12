import stylish from './stylish.js';

const format = (diff, formatType) => {
  switch (formatType) {
    case 'stylish':
      return stylish(diff);
    default:
      throw new Error(`Unsupported format type (${formatType})! [Supported: stylish, plain, json]`);
  }
};

export default format;
