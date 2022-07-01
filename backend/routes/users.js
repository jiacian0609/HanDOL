const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongo = require('mongodb');
const path = require('path');
const multer = require('multer');
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
  return jwt.sign({id, username}, process.env.TOKEN_SECRET); // { expiresIn: '10000000s' }
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
      message: 'Successfully signed in.',
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

/* POST record */
router.post('/record', async function(req, res, next) {
  const card_id = req.body.card_id;
  // console.log('card_id: ', card_id);

  const JWT = req.headers.authorization;
	const payload = jwt.verify(JWT, process.env.TOKEN_SECRET);
	const user_id = payload.id.id;
  // console.log('user_id: ', user_id);

  const query = { u_id: user_id, card_id: card_id};

  try {
    await db.connect();
    console.log('Connection Success');

    const database = db.db('HanDOL');
    const records = database.collection('records');

    // record already exists -> delete
    const result = await records.deleteOne(query); 
    if (result.deletedCount === 1) {
      return res.status(200).send({message: 'Successfully deleted record.'});
    }
    else { // record doesn't exist -> indsert
      const result = await records.insertOne(query);
      console.log(`A document was inserted with the _id: ${result.insertedId}`);
      res.status(200).send({message: 'Successfully added record.'});
    }
  } catch (err) {
    console.log(err);
  } finally {
    db.close();
  }
});

/* GET record */
router.get('/record', async function(req, res, next) {
  const JWT = req.headers.authorization;
	const payload = jwt.verify(JWT, process.env.TOKEN_SECRET);
	const user_id = payload.id.id;
  // console.log('user_id: ', user_id);

  const query = { u_id: user_id };

  try {
    await db.connect();
    console.log('Connection Success');

    const database = db.db('HanDOL');
    const records = database.collection('records');

    const options = { projection: { _id: 0, card_id: 1 } };
    const recordList = await records.find(query, options).toArray();
    // console.log(recordList);

    const recordIds = recordList.map( function(r) { return r.card_id; } );
    // console.log(recordIds);
    

    res.status(200).send({
      message: 'successfully get record list',
      records: recordIds
    });
    
  } catch (err) {
    console.log(err);
  } finally {
    db.close();
  }
});

/* POST post */
const storage1 = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, 'uploads/posts');
  },
  filename: function(req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + '.jpg');
  }
});

const upload1 = multer({
  fileFilter(req, file, cb) {
    // 只接受三種圖片格式
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      cb(new Error('Please upload an image.'))
    }
    cb(null, true)
  },
  storage: storage1
});

router.get('/post', async function (req, res, next) {
  res.sendFile(path.resolve('views/post.html'))
});

router.post('/post', upload1.single('image'), async function (req, res) {
  const JWT = req.headers.authorization;
	const payload = jwt.verify(JWT, process.env.TOKEN_SECRET);
	const user_id = payload.id.id;

  const time = Date.now();
  const content = req.body.content;

  // check if all the information is filled
  if (!content) return res.status(400).send({message: 'Please enter the content.'});
  if (!req.file) return res.status(400).send({message: 'Please upload the image.'});

  let image;
  if (req.file) image = req.file.path;

  try {
    await db.connect();
    console.log('Connection Success');

    const database = db.db('HanDOL');
    const posts = database.collection('posts');

    const doc = {
      time: time,
      user_id: user_id,
      content: content,
      image: image
    };

    const result = await posts.insertOne(doc);
    console.log(`A document was inserted with the _id: ${result.insertedId}`);

    res.status(200).send({message: 'Successfully added post.'});
  } catch (err) {
    console.log(err);
  } finally {
    db.close();
  }
});

/* POST like */
router.post('/like', async function(req, res, next) {
  const post_id = req.body.post_id;
  // console.log('card_id: ', card_id);

  const JWT = req.headers.authorization;
	const payload = jwt.verify(JWT, process.env.TOKEN_SECRET);
	const user_id = payload.id.id;
  // console.log('user_id: ', user_id);

  const query = { u_id: user_id, post_id: post_id};

  try {
    await db.connect();
    console.log('Connection Success');

    const database = db.db('HanDOL');
    const likes = database.collection('likes');

    // record already exists -> delete
    const result = await likes.deleteOne(query); 
    if (result.deletedCount === 1) {
      return res.status(200).send({message: 'Successfully disliked.'});
    }
    else { // record doesn't exist -> indsert
      const result = await likes.insertOne(query);
      console.log(`A document was inserted with the _id: ${result.insertedId}`);
      res.status(200).send({message: 'Successfully liked.'});
    }
  } catch (err) {
    console.log(err);
  } finally {
    db.close();
  }
});

/* GET like */
router.get('/like', async function(req, res, next) {
  const JWT = req.headers.authorization;
	const payload = jwt.verify(JWT, process.env.TOKEN_SECRET);
	const user_id = payload.id.id;
  // console.log('user_id: ', user_id);

  const query = { u_id: user_id };

  try {
    await db.connect();
    console.log('Connection Success');

    const database = db.db('HanDOL');
    const likes = database.collection('likes');

    const options = { projection: { _id: 0, post_id: 1 } };
    const likeList = await likes.find(query, options).toArray();
    // console.log(recordList);

    const likeIds = likeList.map( function(r) { return r.post_id; } );
    // console.log(recordIds);
    

    res.status(200).send({
      message: 'successfully get like list',
      likes: likeIds
    });
    
  } catch (err) {
    console.log(err);
  } finally {
    db.close();
  }
});

/* POST comment */
router.post('/comment', async function(req, res, next) {
  const post_id = req.body.post_id;
  const content = req.body.content;
  // console.log('card_id: ', card_id);

  const JWT = req.headers.authorization;
	const payload = jwt.verify(JWT, process.env.TOKEN_SECRET);
	const user_id = payload.id.id;
  // console.log('user_id: ', user_id);

  const query = { user_id: user_id, post_id: post_id, content: content };

  try {
    await db.connect();
    console.log('Connection Success');

    const database = db.db('HanDOL');
    const comments = database.collection('comments');

    const result = await comments.insertOne(query);
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
    res.status(200).send({message: 'Successfully added comment.'});
  } catch (err) {
    console.log(err);
  } finally {
    db.close();
  }
});

/* POST feedback */
const storage2 = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, 'uploads/feedbacks');
  },
  filename: function(req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + '.jpg');
  }
});

const upload2 = multer({
  fileFilter(req, file, cb) {
    // 只接受三種圖片格式
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      cb(new Error('Please upload an image.'))
    }
    cb(null, true)
  },
  storage: storage2
});

router.get('/feedback', async function (req, res, next) {
  res.sendFile(path.resolve('views/feedback.html'))
});

router.post('/feedback', upload2.single('image'), async function (req, res) {
  const JWT = req.headers.authorization;
	const payload = jwt.verify(JWT, process.env.TOKEN_SECRET);
	const user_id = payload.id.id;

  const time = Date.now();
  const title = req.body.title;
  const type = req.body.type;
  const content = req.body.content;

  // check if all the information is filled
  if (!title) return res.status(400).send({message: 'Please enter the title.'});
  if (!type) return res.status(400).send({message: 'Please select the type.'});
  if (!content) return res.status(400).send({message: 'Please enter the content.'});
  // if (!req.file) return res.status(400).send({message: 'Please upload the image.'});

  let image;
  if (req.file) image = req.file.path;

  try {
    await db.connect();
    console.log('Connection Success');

    const database = db.db('HanDOL');
    const feedbacks = database.collection('feedbacks');

    const doc = {
      time: time,
      user_id: user_id,
      title: title,
      type: type,
      content: content,
      image: image
    };

    const result = await feedbacks.insertOne(doc);
    console.log(`A document was inserted with the _id: ${result.insertedId}`);

    res.status(200).send({message: 'Successfully added feedback.'});
  } catch (err) {
    console.log(err);
  } finally {
    db.close();
  }
});

/* GET username */
router.get('/userInfo', async function(req, res, next) {
  const JWT = req.headers.authorization;
	const payload = jwt.verify(JWT, process.env.TOKEN_SECRET);
	const user_id = payload.id.id;

  try {
    await db.connect();
    console.log('Connection Success');

    const database = db.db('HanDOL');
    const users = database.collection('users');
    const query = { _id: mongo.ObjectId(user_id) };
    const options = { projection: { _id: 0, username: 1, image: 1 } };
    const user = await users.findOne(query, options);

    console.log(user_id);

    res.status(200).send({
      message: 'successfully get user info',
      info: user
    });
  } catch (err) {
    console.log(err);
  } finally {
    db.close();
  }
});

/* POST profile image */
const storage3 = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, 'uploads/profile');
  },
  filename: function(req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + '.jpg');
  }
});

const upload3 = multer({
  fileFilter(req, file, cb) {
    // 只接受三種圖片格式
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      console.log(file.originalname);
      cb(new Error('Please upload an image.'))
    }
    cb(null, true)
  },
  storage: storage3
});

router.post('/profileImg', upload3.single('image'), async function (req, res) {
  const JWT = req.headers.authorization;
	const payload = jwt.verify(JWT, process.env.TOKEN_SECRET);
	const user_id = payload.id.id;

  // check if all the information is filled
  if (!req.file) return res.status(400).send({message: 'Please upload the image.'});

  const image = req.file.path;

  try {
    await db.connect();
    console.log('Connection Success');

    const database = db.db('HanDOL');
    const users = database.collection('users');

    const filter = { _id: mongo.ObjectId(user_id) };
    const update = { $set: { image: image }};

    const result = await users.updateOne(filter, update);
    res.status(200).send({message: 'Successfully updated profile image.'});
  } catch (err) {
    console.log(err);
  } finally {
    db.close();
  }
});

module.exports = router;
