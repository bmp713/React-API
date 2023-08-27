const mongoose = require('mongoose');

const postsSchema = new mongoose.Schema({
    id: String,
    city: String,
    name: String,
    type: String,
    description: String,
    rooms: String,
    price: String,
    img: String,
    url: String
});

module.exports = mongoose.model('Posts', postsSchema);



 