const express = require("express");
const router = express.Router();
const multer = require("multer");
const PublicationController = require("../controllers/publication");
const check = require("../middlewares/auth");

//Upload settings with the middelware multer
const storage = multer.diskStorage({
    destination: (req, file, cd) => {
        cd(null, "./uploads/publications/")
    },
    filename: (req,file,cd) => {
        cd(null, "pub-" + Date.now() + "-" + file.originalname);
    }
});

const uploads = multer({storage});

//definir rutas
router.get("/test-publication", PublicationController.testPublication);
router.post("/save", check.auth ,PublicationController.save);
router.get("/detail/:id", check.auth ,PublicationController.detail);
router.delete("/remove/:id", check.auth ,PublicationController.remove);
router.get("/user/:id/:page?", check.auth ,PublicationController.user);
router.post("/upload/:id", [check.auth, uploads.single("file0")], PublicationController.upload);
router.get("/media/:file", PublicationController.media);
router.get("/feed/:page?", check.auth ,PublicationController.feed);

//exportar router
module.exports = router;