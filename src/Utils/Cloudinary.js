const uploadOnCloudinary = async (fileBuffer, filename) => {
  console.log("Uploading to Cloudinary", filename);

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: "auto",
        public_id: filename,
      },
      (error, result) => {
        if (error) {
          console.error("Cloudinary Upload Error:", error);
          return reject(error);
        }
        console.log("Cloudinary Result:", result);
        resolve(result);
      }
    );

    uploadStream.end(fileBuffer);
  });
};

export default uploadOnCloudinary;
