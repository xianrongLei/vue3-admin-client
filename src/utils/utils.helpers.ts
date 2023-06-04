/**
 * 列表转树
 * @param menus
 * @param parentId
 * @returns
 */
export const useTransTree = <T>(_children: T[] & any[], parentId: string | null): T[] => {
  const result: T[] = [];
  for (let i = 0; i < _children.length; i += 1) {
    const child = _children[i];
    if (child.parentId === parentId) {
      const children = useTransTree(_children, child.id);
      if (children.length > 0) {
        child.children = children;
      }
      result.push(child);
    }
  }
  return result;
};
