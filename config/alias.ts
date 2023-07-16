import { resolve } from "path";
const srcRoot = resolve(__dirname, './../src');
const alias={
    "@": srcRoot,
    'routerPath':'@/router',
    'viewsPath': '@/views',
    'storePath':'@/store',
    'utilsPath': '@/utils',
    'servicePath':'@/service',
    'stylesPath': '@/assets/styles',
};

export default alias;