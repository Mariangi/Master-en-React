// Import dependencies and modules
const bcrypt = require("bcrypt");
const User = require("../models/user");
const fs = require("fs").promises;
const path = require("path");

// Import models
const Follow = require("../models/follow");
const Publication = require("../models/publication");

//Import services
const jwt = require("../services/jwt");
const followService = require("../services/followService");

const testUser  = (req, res) => {
  return res.status(200).send({
    message: "Message sent from: controllers/user.js",
    usuario: req.user
  });
};

// User Registration
const register = async(req, res) => {
  // Retrieve data from the request
  let params = req.body;

  // Check if required fields are present
  if(!params.name || !params.nick || !params.email || !params.password){
    return res.status(500).send({
      status: "error",
      message: "Validation failed",
    });
  }

  // Check for duplicate users
  try {
      const verifiedUser  = await User.find({
        $or: [
          { email: params.email },
          { nick: params.nick },
        ]
      });
  
      if (verifiedUser && verifiedUser.length >= 1) {
        return res.status(200).send({
          status: "success",
          message: "The user already exists",
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Error in the query"
      });
    }

    // User.find({ $or: [
    //     {email: user_to_save.email.toLowerCase()},
    //     {nick: user_to_save.nick.toLowerCase()}
    // ]}).exec((error,user) => {
    //     if(error){
    //         return res.status(500).json({
    //             status: "error",
    //             message: "Error en la consulta"
    //         });
    //     }
    //     if(user && user.length >= 1){
    //         return res.status(200).send({
    //             status: "success",
    //             message: "El ususario ya existe"
    //         });
    //     }
    // })

    // Encrypt the password
    let pwd = await bcrypt.hash(params.password, 10);
    params.password = pwd;

    // Create user object
    let userToSave = new User(params);

    // Save to the database and return the result
    try {
        const savedUser = await userToSave.save();
        return res.status(200).send({
          status: "success",
          message: "User registered successfully",
          user: savedUser,
        });
    } catch (error) {
        return res.status(500).json({
          status: "error",
          message: "Error while saving the user to the database",
        });
    }
}

const login = async(req, res) => {
  // Collect body parameters
  let params = req.body;

  if(!params.email || !params.password){
    return res.status(500).send({
      status: "error",
      message: "Missing data to send",
    });
  }

  try {
    // Search the database if the user already exists
    const user = await User.findOne({ email: params.email });
                  //.select({"password": 0)};

    if (!user) {
      return res.status(404).send({
        status: "error",
        message: "Don't exist this user",
      });
    }

    // Compare password
    let pwd = bcrypt.compareSync(params.password, user.password);
    if(!pwd){
      return res.status(400).send({
        status: "error",
        message: "You have not correctly identified",
      });
    }

    // Get token
    const token = jwt.createToken(user);

    // Return user data
    return res.status(200).send({
      status: "success",
      message: "Logged in",
      //this way I only return some fields from the user
      user: {
        id: user._id,
        name: user.name,
        nick: user.nick
      },
      token
    });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: "Error in the server",
    });
  }

}

const profile = async(req, res) => {
  // Get the user id parameter from the url
  const id = req.params.id;

  // Query to retrieve user data
  let userProfile = [];
  try {
    userProfile = await User.findById(id).select({password: 0, role: 0}); 
  } catch (error) {
    return res.status(404).send({
      status: "error",
      message: "Error looking for user, the user does not exist or there is an error",
    });
  }

  // Get tracking information
  let followinfo = await followService.followThisIds(req.user.id, id );
  
  // Return result
  return res.status(200).send({
    status: "success",
    user: userProfile,
    following: followinfo.following,
    follower: followinfo.follower
  });
}

const list = async(req, res) => {
  //Check which page we are on
  let page = 1;

  if(req.params.page){
    page = parseInt(req.params.page);
  }

  //Query with mongoose paginate
  let itemsPerPage = 5;
  try {
    //paginate method: the first parameter is for search criteria.
    // the second contains, firstly a data and then functions
      //"limit" determines the amount of data returned to me
      //"sort" orders them depending on the criteria that you pass to it
      //"select" is for things you don't want returned from every document
    const {docs, totalDocs, totalPages} = await User.paginate({},{page:page,limit:itemsPerPage,sort:'_id',select:'-password -email -role -__v'}); 

    // Collect a array of ids of the followed users and de same of the identified user
    let followUserIds = await followService.followUserIds(req.user.id);

    //Return the result (later follow information)
    return res.status(200).send({ 
        status: 'success', 
        users: docs, 
        page, 
        itemsPerPage, 
        total: totalDocs, 
        pages: totalPages, 
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

const update = async(req, res) =>{
  //Collect user info to update
  let userIdentity = req.user;
  let userToUpdate = req.body;

  //Delete leftover fields
  delete userToUpdate.iat;
  delete userToUpdate.exp;
  delete userToUpdate.role;
  delete userToUpdate.image;

  //Check if user already exists
  // Check for duplicate users
  try {
    const verifiedUser  = await User.find({
      $or: [
        { email: userToUpdate.email },
        { nick: userToUpdate.nick },
      ]
    });

    // If user already exists
      //This is to verify that the information that the user wanting to add is not the same as the one that another user already has.
    let userIsset = false;
    verifiedUser.forEach(user => {
      if (user && user._id != userIdentity.id){
        userIsset = true;
      } 
    });

    if (userIsset) {
      return res.status(200).send({
        status: "success",
        message: "You cannot modify data to another user",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error in the query"
    });
  }

  //if i get the password encrypt it
  // Encrypt the password
  if(userToUpdate.password){
    let pwd = await bcrypt.hash(userToUpdate.password, 10);
    userToUpdate.password = pwd;
  }else{
    delete userToUpdate.password;
  }

  
  let userUpdated = "";

  try {
    //search and update
    //the first parameter is the id of the user who wants to update their data
    //the second is the new data to update
    //the third parameter indicates if it returns the updated user data
    userUpdated = await User.findByIdAndUpdate({_id: userIdentity.id}, userToUpdate,{new:true});    
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error in the query"
    });
  }

  return res.status(200).send({ 
    status: 'success', 
    message: "ok",
    user: userUpdated
  }); 
}

const upload = async(req, res) =>{

  // Retrieve the image file and verify its existence.
  if(!req.file){
    return res.status(404).send({ 
      status: 'error', 
      message: "The request does not include the image"
    });
  }

  // Obtain the file name.
  let image = req.file.originalname;

  // Extract the file extension.
  let imageSplit = image.split("\.");
  let extension = imageSplit[1];

  // Check the extension.
  if(extension != "png" && extension != "jpg" && extension != "jpeg" && extension != "gif"){
    // If it's incorrect, delete the file.
    const filePath = req.file.path;
    const fileDeleted = await fs.unlinkSync(filePath);
    return res.status(400).send({ 
      status: 'error', 
      message: "Invalid extension"
    });
  }

  // If it's correct, save it in the database.
  try {
    let userUpdated = await User.findByIdAndUpdate({_id: req.user.id}, {image: req.file.filename}, {new:true});
    
    // Return the response.
    return res.status(200).send({ 
      status: 'success', 
      user: userUpdated,
    });

  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error in the avatar update"
    });
  }
}

const avatar = async(req, res) => {
  // Take the parameter from the URL
  const file = req.params.file;

  // Build the actual path of the image
  const filePath = "./uploads/avatars/" + file;

  // Check if it exists
  try {
    let exist = await fs.stat(filePath);

    // console.log("exist:  " +exist);
    if(!exist.isFile()){
      return res.status(404).send({ 
        status: 'error', 
        message: "The image doesn't exist"
      });
    }
    
  } catch (error){
    if (error.code === 'ENOENT') {
      return res.status(404).send({
        status: 'error',
        message: "The image doesn't exist",
      });
    }

    return res.status(500).json({
      status: "error",
      message: "Error in the query",
    });
  }

  // Return the file.
  return res.sendFile(path.resolve(filePath));
}

const counters = async(req, res) => {
  let userId = req.user.id;

  if (req.params.id) userId = req.params.id;

  try {
    const following = await Follow.count({ "user": userId });

    const followers = await Follow.count({ "followed": userId });

    const publications = await Publication.count({ "user": userId });

    return res.status(200).send({
      userId,
      following,
      followers,
      publications
    });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: "Error in counters"
    });
  }
}


// Export objects
module.exports = {
  testUser,
  register,
  login,
  profile,
  list,
  update,
  upload,
  avatar,
  counters
};
