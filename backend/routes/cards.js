const express = require('express');
const router = express.Router();

const db = require('../db');  

/* GET card list */
router.get('/', async function(req, res, next) {
  try {
    await db.connect();
    console.log('Connection Success');

    const database = db.db('HanDOL');
    const cards = database.collection('cards');

    // const query = { group: group, member: member, album: album, version: version };
    // const options = { projection: { _id: 1 } };
    const cardList = await cards.find().toArray();

    res.status(200).send({
      message: 'successfully get card list',
      cards: cardList
    });
  } catch (err) {
    console.log(err);
  } finally {
    db.close();
  }
});

/* GET group */
router.get('/group', async function(req, res, next) {
  try {
    await db.connect();
    console.log('Connection Success');

    const database = db.db('HanDOL');
    const groups = database.collection('groups');

    // const query = { group: group, member: member, album: album, version: version };
    // const options = { projection: { _id: 1 } };
    const groupList = await groups.find().toArray();

    res.status(200).send({
      message: 'successfully get group list',
      cards: groupList
    });
  } catch (err) {
    console.log(err);
  } finally {
    db.close();
  }
});

module.exports = router;
