import React from 'react';
import imgError404 from '../assets/img/error-404.jpg';
import { Link } from 'react-router-dom';

export const Error404 = () => {
  return (
    <div className='wrap-error-404'>
      <img className='error-404' src={imgError404} alt="Error 404" />
      <Link to="/">Back to home</Link>
    </div>
  )
}
