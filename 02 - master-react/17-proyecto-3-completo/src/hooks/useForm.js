import { useState } from "react";

export const useForm = (objetoInicial = {}) => {

    const [formulario, setFormulario] = useState(objetoInicial);

    const serializarFormulario = (formulario) =>{
        const fromData = new FormData(formulario);
        //el from data son todos los datos del formulario
        const objetoCompleto = {};
        //dentro de este for tomamos los datos del formulario y los aorganizamos tomando la clave(name) y asignandole su valor(value) y todo esto lo guardamos en un nuevo objeto para retornarlo
        for (let [name, value] of fromData){
            objetoCompleto[name] = value;
        }
        return objetoCompleto;
    }

    //la funcionserializarFormulario hace lo mismo que hacemos a mano cuando cremalos un objeto y le asignamos claves y valores que salen del e.target

    const enviado = e => {
        console.log(e.target);
        e.preventDefault();
        // let curso = {
        //     titulo: e.target.titulo.value,
        //     anio: e.target.anio.value,
        //     descripcion: e.target.descripcion.value,
        //     autor: e.target.autor.value,
        //     email: e.target.email.value
        // }

        let curso = serializarFormulario(e.target);

        setFormulario(curso);

        document.querySelector(".show").classList.add("enviado")
    }

    const cambiado = e =>{
        //cons la desestructuracion saco el name y el value
        const {name, value} = e.target;
        setFormulario({
            ...formulario,
            [name]: value
        });
    }

  return {
    formulario: formulario,
    enviado,
    cambiado
  }
}
