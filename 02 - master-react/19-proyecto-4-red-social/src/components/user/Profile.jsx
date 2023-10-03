import React, { useEffect, useState } from 'react';
import avatar from '../../assets/img/user.png';
import { Global } from '../../helpers/Global';
import { Link, useParams } from 'react-router-dom';
import { getProfile } from '../../helpers/getProfile';
import useAuth from '../../hooks/useAuth';
import { PublicationList } from '../publication/PublicationList';

export const Profile = () => {

    const [user, setUser] = useState({});
    const [counters, setCounters] = useState({});
    const { auth } = useAuth();
    const [iFollow, setIFollow] = useState(false);
    const [publications, setpublications] = useState([]);
    const [page, setPage] = useState(1);
    const [more, setMore] = useState(true)
    const params = useParams();

    useEffect(() => {
        getDataUser();
        getCounters();
        getPublicaciones(1, true);
    }, []);

    useEffect(() => {
        getDataUser();
        getCounters();
        setMore(true);
        getPublicaciones(1, true);
    }, [params]);

    const getDataUser = async () => {
        let dataUser = await getProfile(params.userId, setUser)
        if (dataUser.following && dataUser.following.length >= 1) setIFollow(true);
    }

    const getCounters = async () => {
        const request = await fetch(Global.url + "user/counters/" + params.userId, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }
        });
        const data = await request.json();

        if (data.userId) {
            setCounters(data);
        }
    }

    const follow = async (userId) => {
        // Fecth to the backend to save the follow
        const request = await fetch(Global.url + "follow/save", {
            method: "POST",
            body: JSON.stringify({ followed: userId }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }
        });
        const data = await request.json();

        // When all is okay
        if (data.status == "success") {
            // Update the following status and add the new follower
            // setFollowing([...following, userId]);
            setIFollow(true);
        }
    }

    const unfollow = async (userId) => {
        // Fecth to the backend to delete the follow
        const request = await fetch(Global.url + "follow/unfollow/" + userId, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }
        });
        const data = await request.json();

        // When all is okay
        if (data.status == "success") {
            // Update the follow status and delete the follower with this id
            // let filterFollowings = following.filter(followingUserId => userId !== followingUserId);
            // setFollowing(filterFollowings);
            setIFollow(false);
        }
    }

    const getPublicaciones = async (nextPage = 1, newProfile = false) => {
        const request = await fetch(Global.url + "publication/user/" + params.userId + "/" + nextPage, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }
        });
        const data = await request.json();

        let newPublications = data.publications;
        if(! newProfile && publications.length >= 1){
            newPublications = [...publications, ...data.publications];
        }

        if(newProfile){
            newPublications = data.publications;
            setMore(true);
            setPage(1);
        }

        setpublications(newPublications);

        if(nextPage == data.pages || data.status == 'error' || data.pages <= 1){
            setMore(false);
        }
    }


    return (
        <>

            <header className="aside__profile-info profile-card" >

                <div className=' profile-image'>
                    {user.image && user.image != "default.png" && <img src={Global.url + "user/avatar/" + user.image} className="container-avatar__img" alt="Foto de perfil" />}
                    {user.image && user.image == "default.png" && <img src={avatar} className="container-avatar__img" alt="Foto de perfil" />}
                </div>

                <div className='profile-card-info'>
                    <div className="profile-info__general-info">
                        <div className="general-info__container-names">
                            <Link to={"profile/" + user._id} className="container-names__name">{user.name} {user.surname}</Link>
                            <p className="container-names__nickname">{user.nick}</p>
                            <p>{user.bio}</p>
                        </div>

                        {user._id != auth._id && (iFollow ? <button className="content__button post__button" onClick={() => unfollow(user._id)}>Unfollow</button> : <button className="content__button" onClick={() => follow(user._id)}>Follow</button>)}
                    </div>

                    <div className="profile-info__stats">

                        <div className="stats__following">
                            <Link to={"/social/following/" + user._id} className="following__link">
                                <span className="following__title">Following</span>
                                <span className="following__number">{counters.following}</span>
                            </Link>
                        </div>
                        <div className="stats__following">
                            <Link to={"/social/followers/" + user._id} className="following__link">
                                <span className="following__title">Followers</span>
                                <span className="following__number">{counters.followers}</span>
                            </Link>
                        </div>

                        <div className="stats__following">
                            <Link to={"/social/profile/" + user._id} className="following__link">
                                <span className="following__title">Posts</span>
                                <span className="following__number">{counters.publications}</span>
                            </Link>
                        </div>

                    </div>
                </div>

            </header>

            <PublicationList 
                publications={publications}
                getPublicaciones={getPublicaciones}
                page={page}
                setPage={setPage}
                more={more}
                setMore={setMore}
            />
           
            <br />

        </>
    )
}
