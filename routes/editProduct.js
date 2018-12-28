const express = require('express');
const editRouter = express.Router();
const addProductModel = require('../schema/addProduct');
function router() {
    editRouter.route('/')
        .post((req, res) => {
            const id = req.body.productId;
            const title = req.body.productName;
            const content = req.body.productDescription;
            const price = req.body.productPrice;
            const location = req.body.productLocation;
            const productData = {
                name: title,
                description: content,
                price: price,
                addedOn: Date.now(),
                location: location
            };
            addProductModel.findByIdAndUpdate(id, productData)
                .exec((err, data) => {
                    if (err) {
                        return res.status(400).send('Some error while updating');
                    }
                    res.status(200).redirect(`/viewProduct/${id}`);
                });
        });
    editRouter.route('/:id')
        .get((req, res) => {
            const id = req.params.id;
            addProductModel.findById(id, (err, data) => {
                if (err) {
                    return res.status(400).send('No data available');
                }
                res.status(200).render('editProduct', {
                    product: data
                });
            });
        });

    return editRouter;
};
module.exports = router();