import React, { useEffect, useState } from 'react';
import avatar from '../../assets/img/user.png';
import { Global } from '../../helpers/Global';
import { Link, useParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { PublicationList } from '../publication/PublicationList';

export const Feed = () => {
    const { auth } = useAuth();
    const [publications, setpublications] = useState([]);
    const [page, setPage] = useState(1);
    const [more, setMore] = useState(true)
    const params = useParams();

    
    useEffect(() => {
        getPublicaciones(1, false);
    }, []);

    const getPublicaciones = async (nextPage = 1, showNews = false) => {

        if(showNews){
            setpublications([]);
            setPage(1);
            nextPage = 1;
        }

        const request = await fetch(Global.url + "publication/feed/" + nextPage, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }
        });
        const data = await request.json();

        let newPublications = data.publications;
        if(!showNews && publications.length >= 1){
            newPublications = [...publications, ...data.publications];
        }
        setpublications(newPublications);

        if(nextPage == data.pages || data.status == 'error' || data.pages <= 1 && !showNews){
            setMore(false);
        }
    }

    return (
        <>
            <header className="content__header">
                <h1 className="content__title">Timeline</h1>
                <button onClick={() => getPublicaciones(1, true)} className="content__button">Show new</button>
            </header>

            <PublicationList 
                publications={publications}
                getPublicaciones={getPublicaciones}
                page={page}
                setPage={setPage}
                more={more}
                setMore={setMore}
            />

        </>
    )
}