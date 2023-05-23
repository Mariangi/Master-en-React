import React, { useEffect, useRef, useState } from 'react';

export const Ejemplo = () => {

    const [contadorSaludos, setContadorSaludos] = useState(0); 
    const saludosEnCola = useRef(contadorSaludos);


    useEffect(() => {
        saludosEnCola.current = contadorSaludos;
        setTimeout(() => {
            console.log("Mensajes en cola: " + saludosEnCola.current)
        }, 2000);
    }, [contadorSaludos]);

    const enviarSaludo = e => {
        setContadorSaludos(contadorSaludos +1);
    }
  return (
    <div>
        <h1>Ejemplo con useRef</h1>

        <h2>Saludos enviados {contadorSaludos}</h2>
        <button onClick={enviarSaludo}>Enviar saludo</button>
    </div>
  )
}
