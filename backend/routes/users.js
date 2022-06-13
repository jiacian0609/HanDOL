const express = require('express');
const router = express.Router();

const db = require('../db');  

/* GET users listing. */
router.get('/', async function(req, res, next) {
  try {
    await db.connect();
    const collection = db.db("test").collection("devices");
    console.log(collection);
  } catch (err) {
    console.log(err);
  } finally {
    db.close();
  }

  res.send('respond with a resource');
});

module.exports = router;
