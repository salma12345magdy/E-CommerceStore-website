const express = require('express');
const mongoose = require('mongoose');
const productRouter = require('./routes/productRouter');
const cartRouter = require('./routes/cartRouter');
const userRouter = require('./routes/userRouter');
const contactRouter = require('./routes/contactRouter');
const adminRouter = require('./routes/adminRouter');  

const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended:true}));

mongoose.connect('mongodb://127.0.0.1:27017/E-CommerceStore')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });

app.use('/products', productRouter);
app.use('/cart', cartRouter);  
app.use('/users', userRouter);
app.use('/images', express.static(path.join(__dirname, '/images')));
app.use('/contact', contactRouter);
app.use('/admin', adminRouter);  


app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
