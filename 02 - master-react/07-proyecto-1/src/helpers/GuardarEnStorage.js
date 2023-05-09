
export const GuardarEnStorage = (clave, elemento) => {

    //Conseguir los elementos que ya tenemos en el localStorage
    let elementos = JSON.parse(localStorage.getItem(clave));

    //Comprobar si es un array
    if(Array.isArray(elementos)){
        //añadir dentro del array
        elementos.push(elemento);
    }else{
        //crear un array y ponerle el elemento nueva
        elementos = [elemento];
    }
    
    //Guardar en el localStorage
      //localStorage es un objeto javascript
    localStorage.setItem(clave, JSON.stringify(elementos));

    //Devolver objeto
    return elemento;
  
}