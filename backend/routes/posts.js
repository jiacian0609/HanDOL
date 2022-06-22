const mongo = require('mongodb');
const express = require('express');
const router = express.Router();

const db = require('../db');  

/* GET all post list */
router.get('/', async function(req, res, next) {
  try {
    await db.connect();
    console.log('Connection Success');

    const database = db.db('HanDOL');
    const posts = database.collection('posts');
    const postList = await posts.find().toArray();

    let resultList = [];

    /* get username */
    const users = database.collection('users');
    for (let i in postList) {
      // console.log(postList[i]);
      const query = { _id: mongo.ObjectId(postList[i].user_id) };
      const options = { projection: { _id: 0, username: 1 } };
      const user = await users.findOne(query, options);
      // console.log(user);
      resultList.push(Object.assign({}, postList[i], user));
    }
    // console.log('post list: ', resultList);

    res.status(200).send({
      message: 'successfully get post list',
      posts: resultList
    });
  } catch (err) {
    console.log(err);
  } finally {
    db.close();
  }
});

/* GET comment */
router.get('/comment/:post_id', async function(req, res, next) {
  const post_id = req.params.post_id;

  try {
    await db.connect();
    console.log('Connection Success');

    const database = db.db('HanDOL');
    const comments = database.collection('comments');

    const query = { post_id: post_id };
    const commentList = await comments.find(query).toArray();
    // console.log(commentList);

    let resultList = [];

    /* get username */
    const users = database.collection('users');
    for (let i in commentList) {
      // console.log(postList[i]);
      const query = { _id: mongo.ObjectId(commentList[i].user_id) };
      const options = { projection: { _id: 0, username: 1 } };
      const user = await users.findOne(query, options);
      // console.log(commentList);
      resultList.push(Object.assign({}, commentList[i], user));
    }

    res.status(200).send({
      message: 'successfully get comment list',
      comments: resultList
    });
    
  } catch (err) {
    console.log(err);
  } finally {
    db.close();
  }
});

module.exports = router;
