import _ from 'lodash';
import { getKey, getValue, getType } from '../utils.js';

const stringify = (value, currentDepth) => {
  const iter = (currentValue, depth) => {
    if (!_.isObject(currentValue)) {
      return `${currentValue}`;
    }

    const indent = '    '.repeat(depth);
    const bracketIndent = '    '.repeat(depth - 1);
    const lines = Object.entries(currentValue).map(([key, val]) => `${indent}${key}: ${stringify(val, depth + 1)}`);

    return ['{', ...lines, `${bracketIndent}}`].join('\n');
  };

  return iter(value, currentDepth);
};

const createIdent = (depth) => ' '.repeat(depth * 4 - 2);

const stylish = (diff) => {
  const iter = (currentNode, depth) => {
    const indent = createIdent(depth);
    const bracketIndent = '    '.repeat(depth - 1);
    const lines = currentNode.map((node) => {
      const [key, type, value] = [getKey(node), getType(node), getValue(node)];

      switch (type) {
        case 'added':
          return `${indent}+ ${key}: ${stringify(value, depth + 1)}`;
        case 'removed':
          return `${indent}- ${key}: ${stringify(value, depth + 1)}`;
        case 'unchanged':
          return `${indent}  ${key}: ${stringify(value, depth + 1)}`;
        case 'updated':
          return [
            `${indent}- ${key}: ${stringify(value[0], depth + 1)}`,
            `${indent}+ ${key}: ${stringify(value[1], depth + 1)}`,
          ].join('\n');
        case 'nested':
          return `${indent}  ${key}: ${iter(value, depth + 1)}`;
        default:
          throw new Error(`Unsupported node type (${type})!`);
      }
    });
    return ['{', ...lines, `${bracketIndent}}`].join('\n');
  };
  return iter(diff, 1);
};

export default stylish;
