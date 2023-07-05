const context:any = import.meta.globEager("./apis/*.ts");
const apisList:any=Object.keys(context).reduce((apis:any,key:any) => {
  const name = key.replace(/(^\.\/apis\/|\.ts$)/g, '');
  const api = context[key].default;
  apis[name] = api;
  return apis;
}, {});

export default {
  ...apisList,
};