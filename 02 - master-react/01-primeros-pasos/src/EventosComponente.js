import React from 'react'

export const EventosComponente = () => {

    const hasDadoClick = (e, nombre) =>{
            alert("Escuche ese click, " + nombre);
    }

    function hasDadoDobleClick(e){
        alert("Has dado doble click");
    }

    const hasEntrado = (e, accion) =>{
        console.log("Has " + accion);
    }
    
    const estasDentro = (e) =>{
        console.log("Estas dentro del input");
    }

    const estasFuera = (e) =>{
        console.log("Estas fuera del input");
    }

  return (<>  
        <h1>EventosComponente</h1>

        {/*Evento click */}
        <p><button onClick={ e => hasDadoClick(e, "Maria")}>Click</button></p>


        {/*Evento doble click */}
        <p><button onDoubleClick={hasDadoDobleClick}>Doble click</button></p>
        
        
        {/*Evento onMouseEnter onMouseLeave (es como un hover)*/}
        <div id='caja'
            onMouseEnter={e => hasEntrado(e,"entrado")}
            onMouseLeave={e => hasEntrado(e,"salido")}>
            pasa sobre mi
        </div>


        {/*Evento onFocus onMouseLeave */}
        <p>
            <input type='text' 
            onFocus={estasDentro}  
            onBlur={estasFuera}
            placeholder='Introduce tu nombre'/>
        </p>

    </>)
}
