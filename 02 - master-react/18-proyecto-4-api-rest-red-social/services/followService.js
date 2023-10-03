const Follow = require("../models/follow"); 

const followUserIds = async(identityUserId) => {
    // Get tracking information
    let following = false;
    try {
        following = await Follow.find({ "user": identityUserId}).select({"followed": 1, "_id": 0 });
        
    } catch (error){
        return{};
    }

    let followers = false;
    try {
        followers = await Follow.find({ "followed": identityUserId}).select({"user": 1, "_id": 0 });
        
    } catch (error){
        return{};
    }

    // Process array of ids
    let followingClean = [];
    following.forEach(follow => {
        followingClean.push(follow.followed);
    });

    let followersClean = [];
    followers.forEach(follow => {
        followersClean.push(follow.user);
    });

    return {
        following: followingClean,
        followers: followersClean
    }
}

const followThisIds = async(identityUserId, profileUserId) => {
    // Get tracking information
    let following = false;
    try {
        following = await Follow.find({ "user": identityUserId, "followed": profileUserId});
        
    } catch (error){
        return{};
    }

    let follower = false;
    try {
        follower = await Follow.findOne({ "user": profileUserId,"followed": identityUserId});
        
    } catch (error){
        return{};
    } return {
        following,
        follower
    }

}

module.exports = {
    followUserIds,
    followThisIds
}