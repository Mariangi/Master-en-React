import React, {useState} from 'react';

export const ComponenteUno = () => {

    //let nombre = "Maria";

    const [nombre, setNombre] = useState("Maria");

    let frutas =[
        "Manzana",
        "Mandarina",
        "Melon"
    ];

    const cambiarNombre = (e ,nuevoNombre) => {
        setNombre(nuevoNombre);
    }


  return (
    <div>
        <h2>Componente Uno</h2>
        {/* condiciones en className de esa manera ponemos un clase u otra dependiedo de la condicion */}
        {/*  si el largo del nombre es mayor o igual a 6 caracteres se le pondra la clase verde de no ser asi se le asignara la clase rojo */}
        <p>Mi nombre es: <strong className={nombre.length >= 6 ? 'verde' : 'rojo'}>{nombre}</strong></p>

        <input type="text" onChange={e => cambiarNombre(e,e.target.value)}  placeholder='Cambiar nombre'/>

        <button onClick={e => {console.log(nombre)}}>Mostrar estado</button>

        <button onClick={ e=> cambiarNombre(e ,"Angeles")}>Cambiar nombre</button>

        <h2>Frutas:</h2>
        <ul>
            {
                frutas.map((fruta,indice) => {
                    return(
                        <li key={indice}>{fruta}</li>

                    );
                })
            }
        </ul>
    </div>
  )
}
