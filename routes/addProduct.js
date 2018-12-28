const express = require('express');
const addProductModel = require('../schema/addProduct');
const multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'staticFiles/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
});
const upload = multer({ storage: storage });
const Productrouter = express.Router();
function AddProductRouter() {
    Productrouter.route('/')
        .get((req, res) => {
            addProductModel.find((err, data) => {
                if (err) {
                    return res.status(400).send('No data available');
                }
                res.status(200).render('addProduct', {
                    dataList: data
                });
            });
        }
        )
        .post(upload.single('productImage'), (req, res) => {
            const title = req.body.productName;
            const content = req.body.productDescription;
            const price = req.body.productPrice;
            const location = req.body.productLocation;
            const image = req.file.filename;
            const productData = {
                name: title,
                description: content,
                price: price,
                addedOn: Date.now(),
                location: location,
                image: image
            };
            const newProduct = new addProductModel(productData);
            newProduct.save(err => {
                if (err) {
                    return res.status(400).send("error");
                }
            });
            res.status(200).redirect('/');
        });
        return Productrouter;
};
module.exports = AddProductRouter();