const express = require('express');
const bodyParser = require('body-parser'); 
const mongoose = require('mongoose');
const moviesRoutes = require('./routes/movies-routes');
const userRoutes = require('./routes/user-routes');
const cors = require('cors')

// HEllo


const app = express();
const devDbLink = 'mongodb://localhost:27017/movies';
const prodDbLink = 'mongodb+srv://ndube1989:saber24teeth@movies-icwdd.mongodb.net/movies?retryWrites=true&w=majority';
mongoose.connect(
    prodDbLink, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
.then(data => {
    console.log('success')
}).catch(err => {
    console.log('err')
})


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
        );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, PATCH, DELETE, OPTIONS"
        )
    next();
});

app.get('', (req, res, next) => {
    res.send('<h1 style="text-align: center">Welcome to the Movies API</h1>');
})

app.use('/api/movies', moviesRoutes);
app.use("/api/user", userRoutes);

module.exports = app;
