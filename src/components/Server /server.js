const fs = require('fs');
const bodyParser = require('body-parser');
const jsonServer = require('json-server');
const jwt = require('jsonwebtoken');

//creating an express Server
const server = jsonServer.create();

//calling the router method
const router = jsonServer.router('../../db.json');
console.log(router)


const userdb = JSON.parse(fs.readFileSync('./users.json', 'UTF-8'))


server.use(jsonServer.defaults());

//defined secret keys and expiredIn
const SECRET_KEY = '123456789'
const expiresIn = '1h'


//create a token from a payload
function createToken(payload){
  return jwt.sign(payload, SECRET_KEY, {expiresIn})
}

//verify the token
function verifyToken(token){
  return  jwt.verify(token, SECRET_KEY, (err, decode) => decode !== undefined ?  decode : err)
}


// Check if the user exists in database
function isAuthenticated({email, password}){
  return userdb.users.findIndex(user => user.email === email && user.password === password) !== -1
}
