import React, { useEffect, useState } from 'react'

export const Empleados = React.memo(
  ({pagina, mensaje}) => {

    const [empleados, setEmpleados] = useState([]);

    useEffect(() =>{
      conseguirEmpleados(pagina);
    }, [pagina]);
    //el useEffect no solo funciona con estados sino tambien con props

    useEffect( () => {
      console.log("renderizar empleados");
      mensaje();
    }, [ empleados]);

    const conseguirEmpleados = async(p) =>{
      const url = 'https://reqres.in/api/users?page=' + p;
      const peticion = await fetch(url);
      const {data: empleados} = await peticion.json();
      setEmpleados(empleados);
    }

    return (
      <div>
        <p>{pagina}</p>
        <ul className='empleados'>
          {empleados.map(empleado => {
            return (
              <li key={empleado.id}>{empleado.first_name + " " + empleado.last_name}</li>
            )
          })}
        </ul>

      </div>
    );
  }
);
