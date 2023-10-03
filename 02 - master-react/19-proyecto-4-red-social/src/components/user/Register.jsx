import React, { useState } from 'react'
import { useForm } from '../../hooks/useForm'
import { Global } from '../../helpers/Global';

export const Register = () => {

  const { form, changed } = useForm({});
  const [ saved, setSaved ] = useState("no_sended");

  const saveUser = async(e) =>{
    e.preventDefault();
  
    // Get form data
    let newUser = form;

    // Save user in db
    const request = await fetch(Global.url + "user/register", {
      method: "POST",
      body: JSON.stringify(newUser),
      headers:{
        "Content-Type": "application/json",
      }
    });

    const data = await request.json();

    if(data.status == "success" ){
      setSaved("saved");
    }else{
      setSaved("error");
    }

  }

  return (
    <>
      <header className="content__header content__header--public">
        <h1 className="content__title">Register</h1>
      </header>

      <div className="content__posts">
        <form className='form register-form' onSubmit={saveUser}>

          <div className='form-group'>
            <label htmlFor="name">Name</label>
            <input type="text" name='name' onChange={changed}/>
          </div>

          <div className='form-group'>
            <label htmlFor="surname">Surname</label>
            <input type="text" name='surname' onChange={changed}/>
          </div>

          <div className='form-group'>
            <label htmlFor="nick">Nick</label>
            <input type="text" name='nick' onChange={changed}/>
          </div>

          <div className='form-group'>
            <label htmlFor="bio">Biography</label>
            <textarea name='bio' onChange={changed}></textarea>
          </div>

          <div className='form-group'>
            <label htmlFor="email">Email</label>
            <input type="email" name='email' onChange={changed} />
          </div>

          <div className='form-group'>
            <label htmlFor="password">Password</label>
            <input type="password" name='password' onChange={changed}/>
          </div>

          {saved == "saved" ? <strong className='alert alert-success'>User successfully registered</strong> : ""}
          {saved == "error" ? <strong className='alert alert-danger'>Error</strong> : ""}

          <input type="submit" value="Sign up" className='btn btn-success'/>

        </form>
      </div>
    </>
  )
}
