// 合并参数路由权限方法
export const matchRoute = (path: any, routes: any) => {
  let result = {}
  for (let item of routes) {
    if (item.path === path) {
      return item
    }
    if (item.children && item.children.length) {
      const res = matchRoute(path, item.children)
      if (Object.keys(res).length) {
        result = res
      }
    }
  };
  return result;
} 