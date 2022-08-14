const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    address : {
        type : String,
        required: true
    },
    name : {
        type: String,
        required: true
        
    },
    expired : {
        type: Date
    }
    
})

const Userdb = mongoose.model('user', schema);

module.exports = Userdb;