import React, { useEffect, useState } from 'react';

export const AjaxComponent = () => {

    const [usuarios, setUsuarios] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [errores, setErrores] = useState("");

    //generico o basico
    const getUsuariosEstaticos = () => {
        setUsuarios([
            {
            "id": 1,
            "email": "maria@reqres.in",
            "first_name": "Maria",
            "last_name": "Lawson",
            },
            {
            "id": 2,
            "email": "maid@reqres.in",
            "first_name": "Maid",
            "last_name": "Ferguson",
            },
            {
            "id": 3,
            "email": "may@reqres.in",
            "first_name": "May",
            "last_name": "Funke",
            }
        ]);
    }

    const getUsuarioAjaxPms = () =>{
        fetch("https://reqres.in/api/users?page=1")
        .then(respuesta => respuesta.json())
        .then(
            resultado_final => {
                setUsuarios(resultado_final.data);
            }, error =>{
                console.log(error);
        })
    }

    const getUsuarioAjaxAw = async() =>{

        setTimeout(async()=>{
            try{
                const peticion = await fetch("https://reqres.in/api/users?page=1");
                const {data} = await peticion.json();
        
                setUsuarios(data);
                setCargando(false);
            }catch(error){
                console.log(error.message);
                setErrores(error.message);
            }
        },1000);
       

       


    }

    useEffect(()=>{
        //getUsuariosEstaticos();
        // getUsuarioAjaxPms();
        getUsuarioAjaxAw();
    },[])

    if(errores !== ""){
          //cuando algo fallo
          return(
            <div className='errores'>
                {errores}
            </div>
        );
    }else if(cargando == true){
        //cuando esta cargando
        return(
            <div className='cargando'>
                cargando datos...
            </div>
        );
    }else if (cargando == false && errores === ""){
        //cuando todo va bien 
        return (
            <div>
                <h2>Listado de usuarios via AJAX</h2>
                    <ol className='usuarios'>
                        {
                            usuarios.map(usuario =>{
                                return <li key={usuario.id}>
                                        <img src={usuario.avatar} width="50px"/>
                                        &nbsp;
                                        {usuario.first_name}
                                    </li>
                            })
                        }
                    </ol>
                
            </div>
        )
    }

}
