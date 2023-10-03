import React, { useState } from 'react'
import useAuth from '../../hooks/useAuth';
import { Global } from '../../helpers/Global';
import { SerializeForm } from '../../helpers/SerializeForm';
import avatar from '../../assets/img/user.png';

export const Config = () => {

  const { auth, setAuth } = useAuth();
  const [ saved, setSaved ] = useState("no_sended");

  const updateUser = async(e) => {
    e.preventDefault();

    // Get token
    const token = localStorage.getItem("token");

    // Get data form
    let newDataUser = SerializeForm(e.target);

    // Delete unnecessary data
    delete newDataUser.file0;

    // Update user in bd
    const request = await fetch(Global.url + "user/update", {
      method: "PUT",
      body: JSON.stringify(newDataUser),
      headers:{
        "Content-Type": "application/json",
        "Authorization": token
      }
    });

    const data = await request.json();

    if(data.status == "success" && data.user){
      delete data.user.password;
      setAuth(data.user);
      setSaved("saved");
    }else{
      setSaved("error");
    }

    // Update images
    const fileInput = document.querySelector("#file");

    if(data.status == "success" && fileInput.files[0]){

      // Get image to update
      const fromData = new FormData();
      fromData.append('file0', fileInput.files[0]);

      // Fetch to send the image
      const uploadRequest = await fetch(Global.url + "user/upload", {
        method: "POST",
        body: fromData,
        headers:{
          "Authorization": token
        }
      });
      const uploadData = await uploadRequest.json();
      
      if(uploadData.status == "success" && uploadData.user){
        delete uploadData.user.password;
        setAuth(uploadData.user);
        setSaved("saved");
      }else{
        setSaved("error");
      }
    }
  }

  return (
    <>
      <header className="content__header content__header--public">
        <h1 className="content__title">Settings</h1>
      </header>

      <div className="content__posts">
        <form className='form config-form' onSubmit={updateUser}>

          <div className='form-group'>
            <label htmlFor="name">Name</label>
            <input type="text" name='name' defaultValue={auth.name}/>
          </div>

          <div className='form-group'>
            <label htmlFor="surname">Surname</label>
            <input type="text" name='surname' defaultValue={auth.surname}/>
          </div>

          <div className='form-group'>
            <label htmlFor="nick">Nick</label>
            <input type="text" name='nick' defaultValue={auth.nick}/>
          </div>

          <div className='form-group'>
            <label htmlFor="bio">Biography</label>
            <textarea name='bio' defaultValue={auth.bio}></textarea>
          </div>

          <div className='form-group'>
            <label htmlFor="email">Email</label>
            <input type="email" name='email' defaultValue={auth.email} />
          </div>

          <div className='form-group'>
            <label htmlFor="password">Password</label>
            <input type="password" name='password'/>
          </div>

          <div className='form-group'>
            <label htmlFor="file0">Avatar</label>
            <div>
              <div className="general-info__container-avatar edit-image-avatar">
                {auth.image != "default.png" && <img src={Global.url + "user/avatar/" + auth.image } className="container-avatar__img" alt="Foto de perfil" />}
                {auth.image == "default.png" && <img src={avatar} className="container-avatar__img" alt="Foto de perfil" />}                            
              </div>
            </div>
            <input type="file" name='file0' id='file'/>
          </div>

          {saved == "saved" ? <strong className='alert alert-success'>User updated successfully</strong> : ""}
          {saved == "error" ? <strong className='alert alert-danger'>Error</strong> : ""}

          <input type="submit" value="Save changes" className='btn btn-success' />

        </form>
        <br />
      </div>
    </>
  )
}
