import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth';

export const Logout = () => {

    const { setAuth, setCounters } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // Empty the localstorage
        localStorage.clear();

        // Change states to empty
        setAuth({});
        setCounters({});

        // Navigate to login
        navigate("/login");

    })

  return (
    <div>Closing session...</div>
  )
}
