import { Global } from "./Global";

export const getProfile = async (userId, setUserProfile) => {

    const request = await fetch(Global.url + "user/profile/" + userId, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token")
        }
    });
    const data = await request.json();

    if (data.status == "success") {
        setUserProfile(data.user);
    }
    return data;
}
