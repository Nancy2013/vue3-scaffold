const context = import.meta.globEager("./*.ts");
const apisList = {} as any;
console.log('context', context)
Object.keys(context).forEach((apis: any) => {
  console.log(apis)
  const name = apis.replace(/(^\.\/|\.ts$)/g, '');
  const api = context[apis].default;

  apisList[name] = api;
  return apis;
}, {});

export default {
  ...apisList,
};