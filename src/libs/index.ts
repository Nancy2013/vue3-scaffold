const context:any = import.meta.glob(["./ant-design/*.ts","./fc/*.ts"],{ eager: true });
const libs:any=Object.keys(context).reduce((lib:any,key:any) => {
  lib.push(context[key].default);
  return lib;
}, []);
console.log('------libs----',libs);

export default (app:any) => {
  libs.forEach((lib:any) => lib(app));
};