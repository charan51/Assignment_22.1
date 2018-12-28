const express = require('express');
const addProductModel = require('../schema/addProduct');
const deleteRouter = express.Router();

function DeleteProduct() {
    deleteRouter.route('/')
        .post((req, res) => {
            const id = req.body.deleteProduct;
            addProductModel.findByIdAndDelete(id)
                .exec((err, data) => {
                    if (err) {
                        return res.send(400).send('there is some trouble in access data');
                    }
                    res.status(200).redirect('/');
                });
        });
    return deleteRouter;
}
module.exports = DeleteProduct();