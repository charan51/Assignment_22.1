const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const addProductSchema = new Schema({
    name: {type: String, required: true},
    image: {type: String},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    addedOn: {type: Date, required: true},
    location: {type: String, required: true}
});
module.exports = mongoose.model('addProduct', addProductSchema);