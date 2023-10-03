// Import model
const Follow = require("../models/follow");
const User = require("../models/user");

// Import service
const followService = require("../services/followService");

// Test actions
const testFollow = (req, res) =>{
    return res.status(200).send({
        message: "Message sent from: controllers/follow.js"
    });
}

// Save a follow (following)
const save = async(req,res) => {
    // Collect the data by body
    let params = req.body;

    // Get the id of the identified user
    const identity = req.user;

    // Create object with follow model
    let userToFollow = new Follow({
        user: identity.id,
        followed: params.followed
    });

    // Save object in data base
    try {
        let followStored = await userToFollow.save();
        return res.status(200).send({
            status: "success",
            identity,
            follow: followStored
        });
    } catch (error) {
        return res.status(500).send({
            status: "error",
            message: "Could not follow user",
        });
    }
}

// Delete a follow (unfollow)
const unfollow = async(req,res) =>{
    // Collect the id of the identified user
    const userId = req.user.id;

    // Collect the id of the user that I follow and want to stop following
    const followedId = req.params.id;

    // Find the matches and remove
    try {
        let followStored = await Follow.findOne({
            "user": userId,
            "followed": followedId
        }).deleteOne();

        return res.status(200).send({
            status: "success",
            message: "Follow successfully removed",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            status: "error",
            message: "Could not follow user",
        });
    }
}

// List of users following specific user (seguidos)
const following = async(req, res) => {
    // Collect the id of identifed user
    let userId = req.user.id;

    // Check if arrive the id from url
    if(req.params.id) userId = req.params.id;

    // Check if arrive the page , else show the page one
    let page = 1;
    if(req.params.page) page = parseInt(req.params.page);

    // Number users per page that i want to show
    const itemsPerPage = 5;

    //Find to follow and paginate with mongoose paginate
    try {
        // const { docs: follows, totalDocs, totalPages } = await Follow.find({ user:userId }).populate('user followed', '-password -role -__v').paginate({page:page, limit:itemsPerPage, sort:'_id'});
        const { docs: follows, totalDocs, totalPages } = await Follow.paginate({ user:userId }, {page:page, limit:itemsPerPage, populate:{path:'user followed',select:'-password -role -__v -email'}});
       
        // List of users following in common with the identified user
        // Collect a array of ids of the followed users and de same of the identified user
        let followUserIds = await followService.followUserIds(req.user.id);

        return res.status(200).send({
            status: "success",
            message: "List of users that I follow",
            userId,
            follows,
            total: totalDocs, 
            pages:totalPages,
            user_following: followUserIds.following, 
            user_follow_me: followUserIds.followers 
        });
    } catch (error) {
        return res.status(500).send({
            status: "error",
            message: "Query failed",
        });
    }
}

// List of users who follow me
// List of users followed by a specific user (seguidores)
const followers = async(req,res) => {
    // Collect the id of identifed user
    let userId = req.user.id;

    // Check if arrive the id from url
    if(req.params.id) userId = req.params.id;

    // Check if arrive the page , else show the page one
    let page = 1;
    if(req.params.page) page = parseInt(req.params.page);

    // Number users per page that i want to show
    const itemsPerPage = 5;

    //Find to follow and paginate with mongoose paginate
    try {
        const { docs: follows, totalDocs, totalPages } = await Follow.paginate({ followed:userId }, {page:page, limit:itemsPerPage, populate:{path:'user followed',select:'-password -role -__v -email'}});
       
        // List of users following in common with the identified user
        // Collect a array of ids of the followed users and de same of the identified user
        let followUserIds = await followService.followUserIds(req.user.id);

        return res.status(200).send({
            status: "success",
            message: "List of users follow me",
            userId,
            follows,
            total: totalDocs, 
            pages:totalPages,
            user_following: followUserIds.following, 
            user_follow_me: followUserIds.followers 
        });
    } catch (error) {
        return res.status(500).send({
            status: "error",
            message: "Query failed",
        });
    }
}



// Export objects
module.exports = {
    testFollow,
    save,
    unfollow,
    following,
    followers
}