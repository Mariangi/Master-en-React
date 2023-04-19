import React, { useState } from 'react';
import PropTypes from "prop-types";

export const EjercicioComponent = ({year}) => {

    const [yearNow , setYearNow] = useState(year);

    const siguiente = e =>{
        setYearNow(yearNow + 1); 
    }

    const anterior = e =>{
        setYearNow(yearNow - 1);
    }

    const cambiarYear = e =>{
        let dato = parseInt(e.target.value);

        if(Number.isInteger(dato)){
            setYearNow(dato);
        }else{
            setYearNow(year);
        }
    }


  return (
    <div>
        <h2>Ejercicio con eventos y useState</h2>
        <strong className='label label-green'>Year: {yearNow}</strong>

        <p className='btns'>
            <button className='btn' onClick={anterior} >Anterior</button>
            <button className='btn' onClick={siguiente}>Siguiente</button>
        </p>
        <p>
            <label>Cambiar año:  </label>
            <input type='text' onChange={cambiarYear} placeholder='Cambia el año'/>
        </p>

    </div>
  )
}

EjercicioComponent.prototype = {
    year: PropTypes.number.isRequired
}
