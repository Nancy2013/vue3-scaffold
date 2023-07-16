import { readFileSync, readdirSync, PathLike } from 'fs';

let idPerfix: string = '';
const svgTitle: RegExp = /<svg([^>+].*?)>/;
const clearHeightWidth: RegExp = /(width|height)="([^>+].*?)"/g;
const hasViewBox: RegExp = /(viewBox="[^>+].*?")/g;
const clearReturn: RegExp = /(\r)|(\n)/g

function findSvgFile(e: PathLike) {
    const svgRes = [];
    const dirents = readdirSync(e, {
        withFileTypes: true
    })
    for(const dirent of dirents) {
        if(dirent.isDirectory()){
            svgRes.push(...findSvgFile(e + dirent.name + '/'));
        }else{
            const svg = readFileSync(e + dirent.name).toString().replace(clearReturn, '').replace(svgTitle, ($1:any, $2:any)=>{
                   let width: number = 0;
                   let height: number = 0;let content = $2.replace(
                       clearHeightWidth,
                       (s1:any, s2:any, s3:any) => {
                           if(s2 === 'width') {
                               width = s3;
                           }else if(s2 === 'height') {
                               height = s3;
                           }
                           return ''
                       }
                   )
                   if(!hasViewBox.test($2)) {
                       content += `viewBox="0 0 ${width} ${height}"`
                   }
                   return `<symbol id="${idPerfix}-${dirent.name.replace('.svg','')}" ${content}>`
            })
            .replace('</svg>', '</symbol>');
            svgRes.push(svg as never);
        }
    }
    return svgRes
}

export const svgModule = (path: any, perfix = 'icon') => {
    if(path == '') return
    idPerfix = perfix;
    const res = findSvgFile(path);
    return {
        name: 'svg-transform',
        transformIndexHtml(dom: String) {
            return dom.replace(
                '<body>',
                `
                <body>
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="position: absolute; width: 0; height: 0">
                  ${res.join('')}
                </svg>
                `
            )
        }
    }
}