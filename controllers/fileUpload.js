const File = require("../models/File");
const cloudinary = require("cloudinary").v2;

//localfileupload -> handle function


exports.localFileUpload = async (req, res) => {
    try {
        //fetch the file
        const file = req.files.file;
        console.log("File is here", file);

        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`; //current file path
        console.log("PATH->", path)

        file.mv(path, (err) => {
            console.log(err);
        });
        res.json({
            success: true,
            message: "Local File Added Successfully"
        })
    } catch (error) {
        console.log(error);
    }
}

function isFiletypeSupported(type, supportedTypes) {
    return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder, quality) {
    const options = { folder };
    //options.resource_type = "auto";
    console.log("temp file path", file.tempFilePath);
    if (quality) {
        options.quality = quality;
    }
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

exports.imageUpload = async (req, res) => {
    try {
        const { name, tags, email } = req.body;
        console.log(name, tags, email);

        //image file fetch
        const file = req.files.imageFile;
        console.log(file);

        //validation
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("File Type", fileType);

        if (!isFiletypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "File Formet not Supported",
            })

        }
        //file formet suport 
        console.log("Uploading to image cloudinary");
        const response = await uploadFileToCloudinary(file, "Image");
        console.log(response);
        //save data to DB

        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url,
        })
        res.status(200).json({
            success: true,
            imageUrl: response.secure_url,
            message: "File Successfully Added",
        })
    } catch (error) {
        console.error(error);
        res.status(400).json({
            success: false,
            message: "Something Went Wrong",
        })
    }
}

//video upload handler function
exports.videoUpload = async (req, res) => {
    try {
        const { name, tags, email } = req.body;
        console.log(name, tags, email);

        //get vdo file
        const file = req.files.videoFile;
        console.log(file);

        //validation
        const supportedTypes = ["mp4", "mov"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("File Type", fileType);
        //add upper limit of % MB 
        if (!isFiletypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "File Formet not Supported",
            })

        }

        //file formet suport 
        console.log("Uploading  Vdo to cloudinary");
        const response = await uploadFileToCloudinary(file, "Image");
        console.log(response);
        //save data to DB

        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url,
        })
        res.status(200).json({
            success: true,
            imageUrl: response.secure_url,
            message: "Video Successfully Added",
        })
    } catch (error) {
        console.error(error);
        res.status(400).json({
            success: false,
            message: "Something Went Wrong",
        })
    }
}


//imageSizeReducer

exports.imageSizeReducer = async (req, res) => {
    try {
        const { name, tags, email } = req.body;
        console.log(name, tags, email);

        //image file fetch
        const file = req.files.imageFile;
        console.log(file);

        //validation
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("File Type", fileType);

        if (!isFiletypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "File Formet not Supported",
            })

        }
        //file formet suport 
        console.log("Uploading to image cloudinary");
        const response = await uploadFileToCloudinary(file, "Image", 30);

        console.log(response);
        //save data to DB

        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url,
        })
        res.status(200).json({
            success: true,
            imageUrl: response.secure_url,
            message: "File Successfully Added",
        })

    } catch (error) {
        console.error(error);
        res.status(400).json({
            success: false,
            message: "Something Went Wrong",
        })
    }
}