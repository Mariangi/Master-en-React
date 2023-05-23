import React, { useRef } from 'react'

export const Formulario = () => {

    const nombreInput = useRef();
    const apellidoInput = useRef();
    const miCaja = useRef();


    const mostrar = e => {
        e.preventDefault();
        console.log(nombreInput);

        console.log(miCaja);
        miCaja.current.classList.add("verde");
        miCaja.current.innerHTML = "Formulario enviado";
    }

  return (
    <div>
        <h2>Formulario</h2>

        <div ref={miCaja} className='miCaja'>
            <p>provando</p>
        </div>

        <form onSubmit={mostrar}>
            <input type="text" placeholder='Nombre' ref={nombreInput}/>
            <br/>
            <input type="text" placeholder='Apellido' ref={apellidoInput}/>
            <br/>
            <input type="email" placeholder='Email'/>
            <br/>

            <input type="submit" className='btn' value='Enviar'/>
        </form>
        <button onClick={() => nombreInput.current.select()}>Comenzar</button>
    </div>
    
  )
}
