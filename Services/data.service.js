//Import JWT Token

const jwt = require('jsonwebtoken');
//after this we need to generate this token at login time

// Import DB

const db = require('./db')


//database
userDetails = {
  1000: { acno: 1000, username: 'Divya', password: 1000, balance: 2000, transaction: [] },
  1001: { acno: 1001, username: 'Gokul', password: 1001, balance: 2000, transaction: [] },
  1002: { acno: 1002, username: 'Tejasswi', password: 1002, balance: 2000, transaction: [] }
}

//Register

const register = (acno, username, password) => {

  return db.User.findOne({ acno })
    .then(user => {  // for connecting 2 ports we use .then ie after this then wats next tat is wat is depicted using .then

      if (user) {

        //if (acno in userDetails) {
        return {
          status: false,
          statusCode: 400,
          message: 'User Already Registered'
        }
      }

      else {
        //userDetails[acno] = {

        const newUser = new db.User({
          acno: acno,
          username: username,
          password: password,
          balance: 0,
          transaction: []
        })
        newUser.save(); // data saved in mongoDB

        //console.log(userDetails);

        return {
          status: true,
          statusCode: 200,
          message: 'Register Successfull'
        }
      }
    })
}


//now in index.js under register req give command



//Login

const login = (acno, pswd) => {
  return db.User.findOne({ acno, password: pswd })
    .then(user => {
      if (user) {
        currentUser = user.username
        currentAcno = acno
        const token = jwt.sign({ currentAcno: acno }, 'superkey2022')

        return {
          status: true,
          statusCode: 200,
          message: 'Login Successfull',
          token: token,
          currentUser:currentUser,
        currentAcno: acno
        }
      }
      else {
        return {
          status: false,
          statusCode: 400,
          message: 'Invalid User Details'
        }
      }
    })
}

//   if (acno in userDetails) {
//     if (pswd == userDetails[acno]['password']) {
//       currentUser = userDetails[acno]['username']
//       currentAcno = acno;

//       //To generate Token
//       const token = jwt.sign({ currentAcno: acno }, 'superkey2022')

//       // for token generation we need a variable here its token
//       // then sign mtd wid parameters n secret token(here superkey2022)

//       return {
//         status: true,
//         statusCode: 200,
//         message: 'Login Successfull',
//         token: token
//       }
//     }
//     else {
//       return {
//         status: false,
//         statusCode: 400,
//         message: 'Password Incorrect'
//       }
//     }
//   }
//   else {
//     return {
//       status: false,
//       statusCode: 400,
//       message: 'Invalid User Details'
//     };
//   }
// }



//Deposit

const deposit = (acno, pswd, amt) => {
  var amount = parseInt(amt)
  return db.User.findOne({ acno, password: pswd })
    .then(user => {
      if (user) {
        user.balance += amount;
        user.transaction.push({
          TYPE: 'CREDIT', //give the way yu hav given in html 
          AMOUNT: amount

        })
        user.save();
        return {
          status: true,
          statusCode: 200,
          message: ` Rs.${amount} is credited and Balance: Rs.${user.balance}`
        }
      }
      else {
        return {
          status: false,
          statusCode: 400,
          message: 'Incorrect Userdetails'
        }
      }
    })
}


//     if (pswd == userDetails[acno]['password']) {
//       userDetails[acno]['balance'] += amount;
//       userDetails[acno]['transaction'].push({
//         TYPE: 'CREDIT', //give the way yu hav given in html 
//         AMOUNT: amount

//       })

//       console.log(userDetails);
//       return {
//         status: true,
//         statusCode: 200,
//         message: ` Rs.${amount} is credited and Balance: Rs.${userDetails[acno]['balance']}`
//       }
//     }

//     else {
//       //  alert('Password incorrect')
//       return {
//         status: false,
//         statusCode: 400,
//         message: 'Password Incorrect'
//       }
//     }

//   }
//   else {
//     //  alert('Invalid UserDetails')
//     return {
//       status: false,
//       statusCode: 400,
//       message: 'Invalid User Details'
//     }
//   }

// }

//Withdraw   

const withdraw = (acno, pswd, amt) => {
  var amount = parseInt(amt)
  return db.User.findOne({ acno, password: pswd, amt })
    .then(user => {
      if (user) {
        if (user.balance > amount) {
          user.balance -= amount;
          user.transaction.push({
            TYPE: 'DEBIT',
            AMOUNT: amount

          })
          user.save();
          return {
            status: true,
            statusCode: 200,
            message: ` Rs.${amount} is debited and Balance: Rs.${user.balance}`
          }
        }
      }
      else {
        return {
          status: false,
          statusCode: 400,
          message: 'Invalid UserDetails'
        }
      }
    })
}


//   if (acno in userDetails) {
//     if (pswd == userDetails[acno]['password']) {
//       if (userDetails[acno]['balance'] > amount) {
//         userDetails[acno]['balance'] -= amount;
//         userDetails[acno]['transaction'].push({
//           TYPE: 'DEBIT',
//           AMOUNT: amount

//         })
//         //return  userDetails[acno]['balance']
//         return {
//           status: true,
//           statusCode: 200,
//           message: ` Rs.${amount} is debited and Balance: Rs.${userDetails[acno]['balance']}`
//         }
//       }
//       else {
//         //alert('Insufficient Fund')
//         return {
//           status: false,
//           statusCode: 400,
//           message: 'Insufficient Fund'
//         }
//       }
//     }
//     else {
//       //alert('Password incorrect')
//       return {
//         status: false,
//         statusCode: 400,
//         message: 'Password Incorrect'
//       }
//     }

//   }
//   else {
//     //alert('Invalid UserDetails')
//     return {
//       status: false,
//       statusCode: 400,
//       message: 'Invalid User Details'
//     }
//   }
// }

//Transaction


const getTransaction = (acno) => {
  return db.User.findOne({ acno })
  .then(user=>{
    if(user){
      return {
        status: true,
        statusCode: 200,
        transaction: user.transaction
      }
    }
    else{
      return {
        status: false,
        statusCode: 400,
        message: 'Insufficient Fund'
         }
    }
  })
  // return {
  //   status: true,
  //   statusCode: 200,
  //   transaction: userDetails[acno]['transaction']
  // }
}

// To delete an account

  const deleteAcc = (acno) => {
   return db.User.deleteOne({ acno })
   .then(user=>{
    if(user){
      return {
        status: true,
        statusCode: 200,
        message: "User deleted Successfully"
      }
    }
    else{
      return {
        status: false,
        statusCode: 400,
        message: 'User not found'
         }
    }
   })
  }



module.exports = {
  register,
  login,
  deposit,
  withdraw,
  getTransaction,
  deleteAcc // after this go to index
}


