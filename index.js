// // Server Creation

// Step 1 -> Import Express

const express = require("express")

//Import data service
const dataService = require('./Services/data.service')

//Import cors
const cors = require('cors')

// Step 2 -> Creating an application for Express
 const app = express()
 

//To parse json from req body
app.use(express.json()) // type conversion 


//Give command to share data via cors
app.use(cors({
   origin:'http://localhost:4200'  //front end bank app path
})) // after this make sure front and back ends are open and in running state


 // Step 3 -> Create port number (for Backend to open)

 app.listen(3000, ()=> {
    console.log('listening on port 3000');
 })
 //if yu try to send in thunder the op will be undefined in terminal as the op is in JSON so we need to convert
 //for tat at top after step 2 do the conversion and run again yu will get o/p


// Application specific middleware
// const appMiddleware= (req,res,next)=>{
//    console.log('Application specific middleware');
//    next();  // if this is not given then in thunder if yu register it will be processing so that we shud specify wats next here.
// }
// app.use(appMiddleware)


//Router specific middleware

//Incase if you want the token to be used for login reg and withdraw oly then use router middleware

const jwt = require('jsonwebtoken')

const jwtMiddleware=(req,res,next)=>{
   console.log('Router specific middleware');
// const token = req.body.token; 
 // token can be given in header section of thunder. and here we hav to change body to header
  const token= req.headers['x-access-token']

//verify token using verify() mtd
const data = jwt.verify(token,'superkey2022')
console.log(data);
next();

}

 // Step 4 -> Resolving http request
 // get http request

 //to get
//  app.get('/' ,(req, res)=>{
//     res.send('Get http request')
//  })

//  //to give 
//  app.post('/' ,(req, res)=>{
//     res.send('Post request')
//  })

//  //to modify or update completely
//  app.put('/' ,(req, res)=>{
//     res.send('Put request')
//  })

//  //for delete
//  app.delete('/' ,(req, res)=>{
//     res.send('Delete request')
//  })

//  //for partially updating
//  app.patch('/' ,(req, res)=>{
//     res.send('Patch request')
//  })

 // now open browswer and in address bar type localhost 3000 to open this code and copy this path and paste in thunder client
 // each and every time yu need to refresh the terminal to open this content to be displayed.

 // for that problem install nodemon --> npm install -g nodemon  -g is to install globally for all folders
 // so once this is installed yu dont hav to run each and eveytime

// ------------------------------------------------------------------------------------------------------------------------------------


// API Calls for Bank App:


//1. Registration Request


app.post('/register',(req,res)=>{
   console.log(req.body);
dataService.register(req.body.acno, req.body.username, req.body.password)
.then (result=>{
  res.status(result.statusCode).json(result)
})

//     if (result)
//    {
//       res.send("Register Successfull")
//    }
//    else{
//       res.send("User already registered")
//    }
 
//   res.send('Register Successful');
})



//2. Login Request


app.post('/login',(req,res)=>{
   console.log(req.body);
dataService.login(req.body.acno, req.body.password)
.then(result=>{
   res.status(result.statusCode).json(result)
})
  //res.status(result.statusCode).json(result)

})


//3. Deposit Request

app.post('/deposit',jwtMiddleware,(req,res)=>{
   console.log(req.body);
dataService.deposit(req.body.acno, req.body.password, req.body.amount)
.then(result=>{
res.status(result.statusCode).json(result)
}) 

})



//4. Withdraw Request

app.post('/withdraw',jwtMiddleware,(req,res)=>{
   console.log(req.body);
 dataService.withdraw(req.body.acno, req.body.password, req.body.amount)
  .then(result=>{
   res.status(result.statusCode).json(result)
  })
})



//5. Transaction Request

app.post('/transaction',jwtMiddleware,(req,res)=>{
   console.log(req.body);
   dataService.getTransaction(req.body.acno)
 .then(result=>{
   res.status(result.statusCode).json(result)
 })

})


//now in thunder if yu see after reg wen we try depositing it happens. but tat process is wrong. first reg the login oly then other process
//has to happen.. so for tat we need tokens


//Token generation

//  login----> client----> server

//The server generates TOKEN wen a user completes registration n logs in. Through client we give the request like deposit,withdraw,etc this
//token will be passed. Atlast if the server generated token is recieved back through client then it is considered successfull else not.
//tats y we use tokens.
//so after reg  -> then login and generate token ie after reg token wont generate oly when we loggin token generates.


//6. Delete Request

app.delete('/deleteAcc/:acno',(req,res)=>{
   dataService.deleteAcc(req.params.acno)
 .then(result=>{
   res.status(result.statusCode).json(result)
 })

})

//same as ds service (for storing common data) here also we need such file