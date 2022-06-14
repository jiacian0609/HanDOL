const bcrypt = require('bcryptjs');
const path = require('path');
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

  res.send('respond with a resource');
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

  try {
    await db.connect();
    console.log('Connection Success');

    const database = db.db('HanDOL');
    const users = database.collection('users');

    // check if all the information is filled
    if (!username) return res.send('Please enter your username.');
    if (!email) return res.send('Please enter your email.');
    if (!password) return res.send('Please enter your password.');

    const hashedPassword = await bcrypt.hash(password);

    // check if the username has been signed up
    let query = { username: username };
    let options = { projection: { _id: 1 } };
    let user = await users.findOne(query, options); 
    if (user) return res.send('The username has been signed up already');
    
    // check if the email has been signed up
    query = { email: email };
    options = { projection: { _id: 1 } };
    user = await users.findOne(query, options); 
    if (user) return res.send('The email has been signed up already');

    const doc = {
      username: username,
      email: email,
      password: hashedPassword
    };

    const result = await users.insertOne(doc);
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
    
    res.status(200);
    res.send('Successfully signed up');
  }
  catch (err) {
    console.log(err);
  }
  finally {
    await db.close();
  }
});

module.exports = router;
