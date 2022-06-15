const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const dotenv = require('dotenv').config({path: './process.env'});
const express = require('express');
const router = express.Router();

const db = require('../db');  

/* GET admin */
router.get('/', async function(req, res, next) {
  res.status(200).send({message: 'respond with a resource'});
});

/* POST addcard */
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, 'uploads');
  },
  filename: function(req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + '.jpg');
  }
});

const upload = multer({
  // dest: 'uploads/',
  // fileSize: 1000000,
  fileFilter(req, file, cb) {
    // 只接受三種圖片格式
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      cb(new Error('Please upload an image.'))
    }
    cb(null, true)
  },
  storage: storage
});

router.get('/addcard', async function (req, res, next) {
  res.sendFile(path.resolve('views/addcard.html'))
});

router.post('/addcard', upload.single('image'), async function (req, res) {
  // console.log(upload);
  // console.log(req.file);

  const group = req.body.group;
  const member = req.body.member;
  const album = req.body.album;
  const version = req.body.version;

  // check if all the information is filled
  if (!group) return res.status(400).send({message: 'Please enter the group.'});
  if (!member) return res.status(400).send({message: 'Please enter the member.'});
  if (!album) return res.status(400).send({message: 'Please enter the album.'});
  if (!version) return res.status(400).send({message: 'Please enter the version.'});
  if (!req.file) return res.status(400).send({message: 'Please upload the image.'});

  const img = fs.readFileSync(req.file.path);
  const encode_image = img.toString('base64'); //將圖片做base64編碼
  const finalImg = {
    contentType: req.file.mimetype,
    image: Buffer.from(encode_image, 'base64')
  };

  try {
    await db.connect();
    console.log('Connection Success');

    const database = db.db('HanDOL');
    const cards = database.collection('cards');

    // check if the card already exists
    const query = { group: group, member: member, album: album, version: version };
    const options = { projection: { _id: 1 } };
    const card = await cards.findOne(query, options); 
    if (card) return res.status(400).send({message: 'The card already exists.'});

    const doc = {
      group: group,
      member: member,
      album: album,
      version: version,
      image: finalImg
    };

    const result = await cards.insertOne(doc);
    console.log(`A document was inserted with the _id: ${result.insertedId}`);

    res.status(200).send({message: 'Successfully added.'});
  } catch (err) {
    console.log(err);
  } finally {
    db.close();
  }
});

module.exports = router;