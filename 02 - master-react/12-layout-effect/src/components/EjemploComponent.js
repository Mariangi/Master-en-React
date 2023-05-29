import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

export const EjemploComponent = () => {

  const [mostrar, setMostrar] = useState(false);

  const caja = useRef();
  const boton = useRef();


    useLayoutEffect(() =>{
      console.log("useLayoutEffect");
      // let caja = document.querySelector("#caja");
       //esto de da informacpn de la caja
      // console.log(caja.getBoundingClientRect());

      if(caja.current == null) return;

      const {bottom} = boton.current.getBoundingClientRect();

// si yo uso el useEffect se ve un parpadeo al aplicarle a la caja los nuevos margenes, pero si uso useLayoutEfect no ocurre, ya que se carga antes que el resto del componente

        caja.current.style.marginTop = `${bottom + 5}px`;  
        caja.current.style.marginLeft = `${bottom + 5}px`;  

     
    }, [mostrar]);

    // useEffect(() =>{
    //     console.log("useEffect");
    //   // let caja = document.querySelector("#caja");
    //   if(caja.current == null) return;

    // }, [mostrar]);


  return (
    <div>
      <h1> EjemploComponent</h1>

      <button className='btn' ref={boton} onClick={() => {
        setMostrar(prev => !prev);
        //el if de abajo y la linea de arriba hacen exactamente los mismo
        //prev contiene el valor anterior, ( si mostrar esta actualemente en true, prev vale true). Y se le esta asignando a prev el valor contrario a prev, es decir, si esta en false se le asigna lo opuesto, true; pero si esta en true, se le asignara false. 
        // if(mostrar == true){
          //   setMostrar(false);
          // }else{
          //   setMostrar(true);
          // }
      }}>Mostrar mensaje</button>

      {
        mostrar && (<div id='caja' ref={caja}>Holis</div>)
      }


    </div>
  )
}
