export const getKey = (node) => node.key;

export const getType = (node) => node.type;

export const getValue = (node) => {
  const type = getType(node);
  if (type === 'added' || type === 'removed' || type === 'unchanged') {
    return node.value;
  }
  if (type === 'updated') {
    return [node.from, node.to];
  }
  return node.children;
};
