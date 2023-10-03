import React, { useState } from 'react';
import { useForm } from '../../hooks/useForm';
import { Global } from '../../helpers/Global';
import useAuth from '../../hooks/useAuth';

export const Login = () => {

  const { form, changed } = useForm({});
  const [ saved, setSaved ] = useState("no_sended"); 
  const { auth, setAuth } = useAuth();

  const loginUser = async(e) =>{
    e.preventDefault();

    // form's data
    let userToLogin = form;

    //fetch
    const request = await fetch(Global.url + "user/login", {
      method: "POST",
      body: JSON.stringify(userToLogin),
      headers:{
        "Content-Type": "application/json",
      }
    });

    const data = await request.json();

    //check request
    if(data.status == "success"){

      //persist data
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setSaved("login");

      // Set data in auth
      setAuth(data.user);

      // Redirect
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }else{
      setSaved("error");
    }
  }

  return (
    <>
      <header className="content__header content__header--public">
        <h1 className="content__title">Login</h1>
      </header>

      <div className="content__posts">
        <form className='form form-login' onSubmit={loginUser}>

          <div className='form-group'>
            <label htmlFor="email">Email</label>
            <input type="email" name='email' onChange={changed}/>
          </div>

          <div className='form-group'>
            <label htmlFor="password">Password</label>
            <input type="password" name='password' onChange={changed}/>
          </div>

          {saved == "login" ? <strong className='alert alert-success'>Logged in</strong> : ""}
          {saved == "error" ? <strong className='alert alert-danger'>Error</strong> : ""}

          <input type="submit" value="Sign in" className='btn btn-success' />

        </form>
      </div>

    </>
  )
}
