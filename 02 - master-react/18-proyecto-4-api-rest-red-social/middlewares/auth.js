//Import dependencies and modules
const jwt = require("jwt-simple");
const moment = require("moment");

//Import secret key
const libjwt = require("../services/jwt");
const secret = libjwt.secret;

//Middelware authentication function
exports.auth = (req, res, next) => {

    //Check if auth header arrives
    if(!req.headers.authorization){
        return res.status(403).send({
            status: "error",
            message: "The request does not have the authentication header"
        });
    }

    //Clean token
    let token = req.headers.authorization.replace(/['"]+/g, '');

    //Decode token
    try {
        let payload = jwt.decode(token, secret);

        //Check token expiration
        if(payload.exp <= moment().unix()){
            return res.status(401).send({
                status: "error",
                message: "Expired token",
                error
            });
        }
        
        
        //Add user data to request
        req.user = payload;

    } catch (error) {
        return res.status(404).send({
            status: "error",
            message: "Invalid token",
            error
        });
    }


    //Go to execution of action
    next();

}
