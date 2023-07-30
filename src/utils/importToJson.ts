import xlsx from "xlsx"; // vue3可用此引入

const importToJson=(file:any)=>{
    return new Promise(resolve => {
        console.log('---importToJson----');
        let reader = new FileReader()
        reader.onload = (ev:any) => {
            const dataBinary=ev.target.result;
            let workBook = xlsx.read(dataBinary, {type: 'binary', cellDates: true})
            let workSheet = workBook.Sheets[workBook.SheetNames[0]]
            const data = xlsx.utils.sheet_to_json(workSheet)
            resolve(data);
        }
        reader.readAsArrayBuffer(file);
    })
}

export default importToJson;