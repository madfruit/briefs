const express = require('express');
const bodyParser = require('body-parser');
const { userRouter, adminRouter} = require('./routers');
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/form', userRouter);
app.use('/admin', adminRouter);
app.use((req, res) => {
    res.redirect('/form');
});

app.set('view engine', 'ejs');
mongoose.connect('mongodb+srv://ivan:someStrongDBPASS@brief.s9njvbe.mongodb.net/test').then(() => {

})
app.listen(3000, () => {
    console.log('Listening on port 3000');
});

