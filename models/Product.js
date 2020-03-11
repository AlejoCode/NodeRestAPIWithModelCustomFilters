const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    tafiffName: {
        type: String,
        required: [true, 'Please filled the tafiff name, We need it o:']
    },
    annualCosts: {
        type: Number,
        required: [true, 'Please filled the annual costs, We need it X:']
    }
});

const Product = mongoose.model('product', ProductSchema);

module.exports = Product;        
 