import multer from "multer";

const storage = multer.diskStorage({

    // location
    destination : (req, file , callback) => {
        callback(null, './uploads/');
    },

    // Convert file name
    filename : (req, file, callback) => {
        callback(null, Date.now() + '-' + file.originalname);
    }

});

const upload = multer({ storage });

export default upload;