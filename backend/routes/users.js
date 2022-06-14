const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const dotenv = require('dotenv').config({path: './process.env'});
const express = require('express');
const router = express.Router();

const db = require('../db');  

/* GET users listing. */
router.get('/', async function(req, res, next) {
  /* try {
    await db.connect();
    const collection = db.db("test").collection("devices");
    console.log(collection);
  } catch (err) {
    console.log(err);
  } finally {
    db.close();
  }*/

  res.status(200).send({message: 'respond with a resource'});
});

/* POST sign up */
router.get('/signup', async function (req, res, next) {
  res.sendFile(path.resolve('views/signup.html'))
});

router.post('/signup', async function (req, res, next) {
  // console.log(req);

  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  // check if all the information is filled
  if (!username) return res.status(400).send({message: 'Please enter your username.'});
  if (!email) return res.status(400).send({message: 'Please enter your email.'});
  if (!password) return res.status(400).send({message: 'Please enter your password.'});

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await db.connect();
    console.log('Connection Success');

    const database = db.db('HanDOL');
    const users = database.collection('users');

    // check if the username has been signed up
    let query = { username: username };
    let options = { projection: { _id: 1 } };
    let user = await users.findOne(query, options); 
    if (user) return res.status(400).send({message: 'The username has been signed up already.'});
    
    // check if the email has been signed up
    query = { email: email };
    options = { projection: { _id: 1 } };
    user = await users.findOne(query, options); 
    if (user) return res.status(400).send({message: 'The email has been signed up already.'});

    const doc = {
      username: username,
      email: email,
      password: hashedPassword
    };

    const result = await users.insertOne(doc);
    console.log(`A document was inserted with the _id: ${result.insertedId}`);

    res.status(200).send({message: 'Successfully signed up.'});
  }
  catch (err) {
    console.log(err);
  }
  finally {
    await db.close();
  }
});

/* GET sign in */
function generateAccessToken(id, username) {
  return jwt.sign({id, username}, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
};

router.get('/signin', async function (req, res, next) {
  res.sendFile(path.resolve('views/signin.html'))
});

router.post('/signin', async function (req, res, next) {
  // console.log(req);

  const account = req.body.account;
  const password = req.body.password;

  // check if all the information is filled
  if (!account) return res.status(400).send({message: 'Please enter your username or email.'});
  if (!password) return res.status(400).send({message: 'Please enter your password.'});

  let token;

  try {
    await db.connect();
    console.log('Connection Success');

    const database = db.db('HanDOL');
    const users = database.collection('users');

    // check if the username has been signed up
    let query = { username: account };
    let options = { projection: { _id: 1, password: 1 } };
    let user = await users.findOne(query, options); 
    if (!user) {
      // check if the email has been signed up
      query = { email: account };
      user = await users.findOne(query, options);
      if (!user) return res.status(400).send({message: 'The username or email hasn\'t been signed up.'});
    }

    // compare password
    await bcrypt.compare(password, user.password)
      .then(async function (res) {
        // correct password
        if (res == true) 
          token = generateAccessToken({
            id: user._id,
            username: user.username
          }); 
      })
    
    if (token) return res.status(200).send({
      message: 'Sign in successfully.',
      token: token
    });
    else return res.status(400).send({message: 'Wrong password.'});
  }
  catch (err) {
    console.log(err);
  }
  finally {
    await db.close();
  }
});

module.exports = router;
