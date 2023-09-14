export const getFecha = (fecha:string) => {
    const newFecha = new Date(fecha)
    const fechaString = newFecha.getDay().toString() + '/' + newFecha.getMonth().toString() + '/' + newFecha.getFullYear().toString()
    return fechaString
}