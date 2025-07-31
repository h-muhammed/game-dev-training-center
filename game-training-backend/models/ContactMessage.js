const mongoose = require("mongoose")

const ContactMessageSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    phone:{
        type: String,
        required: true
    },
    message:{
        type: String,
        required: true,
        trim: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("ContactMessage", ContactMessageSchema);