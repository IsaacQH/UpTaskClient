
export function formateDate(isaString:string) : string {
    const data = new Date(isaString)  //Creamos un objeto fecha con lo enviado
    const formatter = new Intl.DateTimeFormat('en-US',  {//En formado en ingles con dateTime
        year: "numeric",
        month: "long",
        day: "numeric"
    })
    return formatter.format(data)   
}