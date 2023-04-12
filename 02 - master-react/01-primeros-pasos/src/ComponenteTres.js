import React from 'react';
import PropTypes from 'prop-types';

export const ComponenteTres = ({nombre="Mar",ficha}) => { 
// export const ComponenteTres = (props) => { props es igual que params

  return (<>
     <h1>Comunicacion entre componentes</h1>
    <ul>
        <li>{nombre}</li>
        <li>{ficha.altura}</li>
        <li>{ficha.grupo}</li>
        <li>{ficha.estado}</li>
    </ul>
    </>)
}


//valida dependeidendo de lo que le pidas qu evalide en este caso valida que sea un string
 

ComponenteTres.prototype = {
    nombre: PropTypes.string.isRequired,
    ficha: PropTypes.object
};

ComponenteTres.defaultProps = {
    nombre: "Mary"
}