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

    res.status(200).send({
      message: 'successfully get post list',
      posts: postList
    });
  } catch (err) {
    console.log(err);
  } finally {
    db.close();
  }
});

module.exports = router;
