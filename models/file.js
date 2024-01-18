const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const fileSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    imageUrl:{
        type:String,
    },
    tags:{
        type:String,
    },
    email:{
        type:String,
    }
});

//post middleware
fileSchema.post("save", async function(doc){ //entry which are create in db are refered as doc
    try {
        console.log("DOC", doc);
        //transporter
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth:{
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },

        });


        //send mail
        let info = await transporter.sendMail({
            from:"Study Notion",
            to:doc.email,
            subject:"New File Uploaded",
            html:`<h2>Hello Dear</h2> <p>File Uploaded View here:<a href="${doc.imageUrl}">${doc.name}</a> </p>`,
        })
        console.log(info);


    } catch (error) {
        console.error(error);
    }
})



const File = mongoose.model("File", fileSchema);
module.exports = File;
