const mongoose = require("mongoose");
const { stringify } = require("querystring");

// in mongoose model is wrapper for schema
// schema defines the stucture and model provides interface to the database

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        // required: true,
        required:[true, "must provide a name"],
        trim:true,
        maxlength:[20, "name can't be bigger thatn 20 letters"]

    },
    completed:{
        type:Boolean,
        default:false
    }
});

module.exports = mongoose.model("task", taskSchema); // name of model and schema