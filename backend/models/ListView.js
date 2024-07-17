const mongoose = require('mongoose');
const ListViewSchema  = new mongoose.Schema({

    id: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    body : {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("ListView",ListViewSchema )