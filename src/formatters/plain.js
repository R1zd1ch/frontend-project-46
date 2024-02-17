import _ from 'lodash';
import { getKey, getType, getValue } from '../utils.js';

const formatValueToPlain = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return `${value}`;
};

const plain = (diff) => {
  const iter = (curNode, prevPath) => {
    const lines = curNode.map((node) => {
      const [key, type, value] = [getKey(node), getType(node), getValue(node)];
      const curPath = [...prevPath, key];
      const baseLine = `Property '${curPath.join('.')}' was ${type}`;
      switch (type) {
        case 'added':
          return `${baseLine} with value: ${formatValueToPlain(value)}`;
        case 'removed':
          return `${baseLine}`;
        case 'unchanged':
          return '';
        case 'updated':
          return `${baseLine}. From ${formatValueToPlain(value[0])} to ${formatValueToPlain(value[1])}`;
        case 'nested':
          return iter(value, curPath);
        default:
          throw new Error(`Unsupported node type (${type})!`);
      }
    });

    return lines.filter((line) => line !== '').join('\n');
  };

  return iter(diff, '');
};

export default plain;
