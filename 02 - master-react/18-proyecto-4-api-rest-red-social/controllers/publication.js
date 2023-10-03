// Importar modulos
const fs = require("fs").promises;
const path = require("path");

// Import models
const Publication = require("../models/publication");

// Import services
const followServices = require("../services/followService");

// Test actions
const testPublication = (req, res) =>{
    return res.status(200).send({
        message: "Message sent from: controllers/publication.js"
    });
}

// Save post
const save = async(req, res) =>{
    // Collect the data by body
    const params = req.body;

    // If i don't receive a bad answer
    if(!params.text){
        return res.status(400).send({
            status: "error",
            message: "You must send the text of the publication"
        });
    }

    // Create and fill the model object
    let newPublication = new Publication(params);
    newPublication.user = req.user.id;

    // Save the object to database
    try {
        let publicationStored = await newPublication.save();
        // Return the result
        return res.status(200).send({
            status: "success",
            message: "Saved post",
            publicationStored
        });
    } catch (error) {
        return res.status(400).send({
            status: "error",
            message: "Query failed"
        });
    }  
}

// Take out a post
const detail = async(req, res) => {
    // Get id's post
    const publicationId = req.params.id;

    // Find to id
    try {
        let publicationStored = await Publication.findById(publicationId);
        // Return result
        if(publicationStored == null ){
            return res.status(404).send({
                status: "error",
                message: "The publication does not exist",
            });
        }

        return res.status(200).send({
            status: "success",
            publication: publicationStored
        });
    } catch (error) {
        return res.status(400).send({
            status: "error",
            message: "Query failed"
        });
    }
}

// Delete posts
const remove = async(req, res) => {
    // Get the id of post
    const publicationId = req.params.id;

    // Find and Remove
    try {
        let deletedPublication  = await Publication.findOneAndDelete({"user": req.user.id, "_id": publicationId});

        if (!deletedPublication) {
            return res.status(404).send({
                status: "error",
                message: "Publication not found"
            });
        }

        // Return result
        return res.status(200).send({
            status: "success",
            message: "Publication removed",
            publicationId
        });
    } catch (error) {
        return res.status(400).send({
            status: "error",
            message: "Query failed"
        });
    }
}

// List all posts by a specific user
const user = async(req, res) =>{
    try {
        // Get user id
        const userId = req.params.id;

        // Check the page
        let page = 1;

        if(req.params.page) page = parseInt(req.params.page);

        const itemsPerPage = 5;

        // Find, populate, sort, and paginate
        const {docs: publications, totalDocs, totalPages} = await Publication.paginate({user: userId},{page,limit:itemsPerPage,sort:'-created_at',populate:{path:'user',select:'-password -role -__v -email'}}); 

        if(!publications || !publications.length) return res.status(404).send({status:'error',message:'No posts available'}); 

        // Return result
        return res.status(200).send({
            status: "success",
            message: "List all posts by a specific user",
            page,
            total: totalDocs, 
            pages:totalPages,
            publications,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            status: "error",
            message: "Query failed"
        });
    }
}


// Update images
const upload = async(req, res) =>{
    // Get publication id
    const publicationId = req.params.id;

    // Get the image file and verify its existence
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
        // console.log(req.user.id);
        // console.log(publicationId);
        // console.log(req.file.filename);
      let publicationUpdated = await Publication.findByIdAndUpdate({"user": req.user.id, "_id": publicationId}, {file: req.file.filename}, {new:true});
      
      // Return the response.
      return res.status(200).send({ 
        status: 'success', 
        publication: publicationUpdated,
        file: req.file
      });
  
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Error in the avatar update"
      });
    }
  }
  

// Return images files
const media = async(req, res) => {
    // Take the parameter from the URL
    const file = req.params.file;
  
    // Build the actual path of the image
    const filePath = "./uploads/publications/" + file;
  
    // Check if it exists
    try {
      let exist = await fs.stat(filePath);
  
      console.log("exist:  " +exist);
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
  

// List all posts (feed)
const feed = async(req, res) => {
    // Get current page
    let page = 1

    if(req.params.page) page = parseInt(req.params.page);

    const itemsPerPage = 5;

    try {
        // Get a array of user ids that i(the user logged in) follow 
        const myFollows = await followServices.followUserIds(req.user.id);
        
        // Find in of publications, sort, populate and paginate  
        const {docs: publications, totalDocs, totalPages} = await Publication.paginate({user: myFollows.following},{page,limit:itemsPerPage,sort:'-created_at',populate:{path:'user',select:'-password -role -__v -email'}}); 

        if(!publications || !publications.length) return res.status(404).send({status:'error',message:'No posts available'}); 


        return res.status(200).send({ 
            status: 'success', 
            message: "feed",
            following: myFollows.following,
            page,
            total: totalDocs, 
            pages:totalPages,
            publications, 
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Error in the query",
        });
    }
}


// Export objects
module.exports = {
    testPublication,
    save,
    detail,
    remove,
    user,
    upload,
    media,
    feed
}