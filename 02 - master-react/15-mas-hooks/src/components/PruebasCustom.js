import React, { useState } from 'react';
import { useMayus } from '../hooks/useMayus'

export const PruebasCustom = () => {

    let texto = "i dont relate to you, i dont relate to you, no. because I'd never treat me this shitty. you made me hate this city";

    // const [estado, miTexto, setMiTexto] = useState(texto);


    const {estado, mayusculas, minusculas, concatenar} = useMayus(texto);


    // const textoMayusculas = mayusculas();
    // const textoMinusculas = minusculas();
    // const textoConcatenado = concatenar("  And I dont talk shit about you on the internet. Never told anyone anything bad. Cause that shits embarrassing, you were my everything");


    const constatenarInfo = e => {
        e.preventDefault();
        concatenar(e.target.add.value);
    }

  return (
    <div>
        <h1>Probando componente personalizado</h1>

        <h3>{estado}</h3>

        <div className='btns'>
            <button className='btn' onClick={mayusculas}>Mayusculas</button>
            <button className='btn' onClick={minusculas}>Minusculas</button>
        </div>
        <form className='wrap' onSubmit={e => {constatenarInfo(e)}}>
            <input type='text' name='add'/>
            <input type='submit' className='btn' value="Concatenar" />
        </form>

    </div>
  )
}
