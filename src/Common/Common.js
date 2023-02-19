


export const logOut= ()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
}
export const DownloadFile = (filePath, fileName)=>{

    let link = document.createElement('a');
               

    link.download= fileName;
    link.href =  encodeURI(filePath);
    link.target= "_blank";
    link.type= 'application/pdf';
    document.body.appendChild(link);
    link.click()
    document.body.removeChild(link)

}

export const GetDate = (date) => {
    let d = new Date(date)

    return `
    ${d.getDay()}/${d.getMonth() + 1}/${d.getFullYear()}
    ${("0" + d.getHours()).slice(-2)}:${d.getMinutes()}:${("0" + d.getSeconds()).slice(-2)}
`
}