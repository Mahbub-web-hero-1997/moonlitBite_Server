import multer from "multer";

const storage = multer.memoryStorage(); // Change from diskStorage to memoryStorage

const upload = multer({
  storage,
  limits: { fileSize: 1 * 1024 * 1024, files: 4 },
});

export default upload;
