import multer from "multer";


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/temp"); // Ensure this directory exists
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname); // Save with a timestamp and original filename
    },
})