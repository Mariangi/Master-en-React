import React, { useEffect, useState } from 'react';
import { Global } from '../../helpers/Global';
import { UserList } from './UserList';

export const People = () => {

  const [users, setUsers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [more, setMore] = useState(true);

  useEffect(() => {
    getUsers(1);
  }, []);

  const getUsers = async(nextPage = 1) => {
    setLoading(true);
    // fetch to get users
    const request = await fetch(Global.url + "user/list/" + nextPage , {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token")
      }
    });

    const data = await request.json();

    // Create a status to list users 
    if (data.users && data.status == "success") {
      let newUsers = data.users;
      if(users.length >=1){
        newUsers = [...users, ...data.users];
      }
      setUsers(newUsers);
      setFollowing(data.user_following)
      setLoading(false);

      // Paginate
      if(nextPage == data.pages){
        setMore(false);
      }

      // if(user.length >= (data.total - data.users.length)){
      //   setMore(false);
      // }

    }
  }

  return (
    <>
      <header className="content__header">
        <h1 className="content__title">People</h1>
        <button className="content__button">Show new</button>
      </header>

      <UserList users={users} 
        getUsers={getUsers}
        following={following} 
        setFollowing={setFollowing} 
        page={page}
        setPage={setPage}
        loading={loading}
        more={more}
      />

      <br />

    </>
  )
}
