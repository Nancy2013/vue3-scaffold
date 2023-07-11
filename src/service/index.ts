const context:any = import.meta.glob("./apis/*.ts",{ eager: true });
const apisList:any=Object.keys(context).reduce((apis:any,key:any) => {
  const name = key.replace(/(^\.\/apis\/|\.ts$)/g, '');
  const api = context[key].default;
  apis[name] = api;
  return apis;
}, {});

export default {
  ...apisList,
};