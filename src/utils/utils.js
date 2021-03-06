import { parse } from 'querystring';
import pathRegexp from 'path-to-regexp';

/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
export const isUrl = path => reg.test(path);
export const isAntDesignPro = () => {
  if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return true;
  }

  return window.location.hostname === 'preview.pro.ant.design';
}; // 给官方演示站点用，用于关闭真实开发环境不需要使用的特性

export const isAntDesignProOrDev = () => {
  const { NODE_ENV } = process.env;

  if (NODE_ENV === 'development') {
    return true;
  }

  return isAntDesignPro();
};
export const getPageQuery = () => parse(window.location.href.split('?')[1]);
/**
 * props.route.routes
 * @param router [{}]
 * @param pathname string
 */

export const getAuthorityFromRouter = (router = [], pathname) => {
  const authority = router.find(
    ({ routes, path = '/', target = '_self' }) =>
      (path && target !== '_blank' && pathRegexp(path).exec(pathname)) ||
      (routes && getAuthorityFromRouter(routes, pathname)),
  );
  if (authority) return authority;
  return undefined;
};
export const getRouteAuthority = (path, routeData) => {
  let authorities;
  routeData.forEach(route => {
    // match prefix
    if (pathRegexp(`${route.path}/(.*)`).test(`${path}/`)) {
      if (route.authority) {
        authorities = route.authority;
      } // exact match

      if (route.path === path) {
        authorities = route.authority || authorities;
      } // get children authority recursively

      if (route.routes) {
        authorities = getRouteAuthority(path, route.routes) || authorities;
      }
    }
  });
  return authorities;
};

const sleep = (time) => {
  const startTime = new Date().getTime() + parseInt(time, 10);
  while (new Date().getTime() < startTime) {
  }
};

//截取字符串，多余部分用...显示
export const beautySub = (str, len) => {
  if (str != null)
    return '...'.padStart(len, str);
  else return '';
};

//千分位分割
export const formatThousand = (num) => {

  return (num + '').replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, '$1,');

};

//标签颜色
export const colorChange = () => {
  const i = parseInt(Math.random()*(11-0+1)+0);
  let color;
  switch (i) {
    case 0: color = "#f50"; break;
    case 1: color = "#2db7f5";break;
    case 2: color = "#87d068";break;
    case 3: color = "#108ee9";break;
    case 4: color = "#ef5b9c";break;
    case 5: color = "#f58220";break;
    case 6: color = "#ed1941";break;
    case 7: color = "#ea66a6";break;
    case 8: color = "#8552a1";break;
    case 9: color = "#2a5caa";break;
    case 10: color = "#7fb80e";break;
    case 11: color = "#009ad6";break;
  }
  return color;
};
