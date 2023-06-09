const mongoose = require("mongoose");

const equipeSchema = new mongoose.Schema({
    nom:{
        type:String,
        requied:true,
    },
    country:{
        type:String,
        required:true
    }
})
module.exports = mongoose.model('Equipe',equipeSchema);
