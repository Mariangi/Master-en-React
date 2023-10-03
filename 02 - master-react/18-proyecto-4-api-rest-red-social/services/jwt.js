//Import dependencies
const jwt = require("jwt-simple");
const moment = require("moment");

//Secret key
const secret = "social_media_project_secret_key_987987";

//function to generate tokens
 const createToken = (user) => {
    const payload = {
        id: user._id,
        name: user.name,
        surname: user.surname,
        nick: user.nick,
        email: user.email,
        role: user.role,
        image: user.image,
        iat: moment().unix(), //this is the time the token is created
        exp: moment().add(30, "days").unix() //this is the token expiration date, based on the token creation date
    };

    //Return encode jwt token
    return jwt.encode(payload, secret);
}

module.exports = {
    secret,
    createToken
}