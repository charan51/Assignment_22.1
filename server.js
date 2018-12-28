const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/myProducts').then(() => {
    console.log("connected to DB success");
}).catch(err => console.log(err));
const addProductModel = require('./schema/addProduct');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'staticFiles')));
app.set('view engine', 'ejs');
app.set('views', 'views');

const AddProductRouter = require('./routes/addProduct');
const EditProductRouter = require('./routes/editProduct');
const ViewProductRouter = require('./routes/viewProduct');
const DeleteProductRouter = require('./routes/deleteProduct');

app.use('/addProduct', AddProductRouter);
app.use('/editProduct', EditProductRouter);
app.use('/viewProduct', ViewProductRouter);
app.use('/deleteProduct', DeleteProductRouter);

// *******************************************
// *************************** Start of DUMMY ****************
// Adding 10 dummy data DB if there are not products for DEMO only for assignment
// Please uncomment to stop adding dummy data.
addProductModel.find((err, data) => {
    if (data.length === 0) {
        for (let i = 0; i < 10; i++) {
            const productData = {
                name: 'Product Name',
                description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
                price: 1234,
                addedOn: Date.now(),
                location: 'Product Location',
                image: '/dummy.jpg'
            };
            const newProduct = new addProductModel(productData);
            newProduct.save();
        }
    }
});
// *******************************************
// *************************** END of DUMMY ****************

app.get('/', (req, res) => {
    addProductModel.find((err, data) => {
        if (err) {
            return res.status(400).send('No data available');
        }
        res.status(200).render('home', {
            dataList: data
        });
    });
});
//  Route config
app.listen(8080, () => {
    console.log('App is running on PORT 8080');
});