// Server - MongoDB Intergration
//--------------------------------------

// 1) Import the installed Mongoose
const mongoose = require('mongoose')


// 2) State connection string via mongoose

mongoose.connect('mongodb://127.0.0.1:27017/BankServer', //in my node version is high so instead of localhost127.0.0.1
{
    useNewUrlParser:true  // to avoid unwanted warnings
});

// 3) Define bank db model

const User = mongoose.model('User',
{
    //Schema Creation

    acno:Number,
    username:String,
    password:String,
    balance:Number,
    transaction:[]
});


//Export Collection

module.exports={
    User
}

// now import this db to data service