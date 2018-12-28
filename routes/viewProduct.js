const express = require('express');
const addProductModel = require('../schema/addProduct');
const viewRouter = express.Router();

function viewProduct() {
    viewRouter.route('/:id')
        .get((req, res) => {
            const id = req.params.id;
            addProductModel.findById(id, (err, data) => {
                if (err) {
                    return res.status(400).send('No data available');
                }
                res.status(200).render('viewProduct', {
                    product: data
                });
            });
        });
    return viewRouter;
}
module.exports = viewProduct();