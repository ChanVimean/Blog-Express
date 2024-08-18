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

    // File filter: extension (jpg,, png)
    // filesize: 10MB
});

const upload = multer({ storage : storage });

export default upload;