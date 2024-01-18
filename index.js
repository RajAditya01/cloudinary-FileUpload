//app create
const express = require("express");
const app = express();

//PORT findout
const PORT = process.env.PORT || 3000;

//Add middleware
app.use(express.json());
const fileUpload = require("express-fileupload");
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

//connect   to DB
const db = require("./config/database");
db.connect();

//connect to cloud
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

//mount api route
const Upload = require("./routes/fileUpload");
app.use('/api/v1/upload', Upload);

//Activate Server
app.listen(PORT, () => {
    console.log(`App is running at port ${PORT}`);
})