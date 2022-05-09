/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/ban-types */
const asyncWrap = (fn: Function) => function asyncUtilWrap(req: any, res: any, next: any, ...args: any) {
  const fnReturn = fn(req, res, next, ...args);
  return Promise.resolve(fnReturn).catch(next);
};

export default asyncWrap;
