const express = require('express');
const router = express.Router();

const db = require('../db');  

/* GET all card list */
router.get('/', async function(req, res, next) {
  try {
    await db.connect();
    console.log('Connection Success');

    const database = db.db('HanDOL');
    const cards = database.collection('cards');
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

/* GET card list by query*/
router.post('/query', async function(req, res, next) {
  const query = req.body;
  // console.log('query: ', query);

  try {
    await db.connect();
    console.log('Connection Success');

    const database = db.db('HanDOL');
    const cards = database.collection('cards');

    // const options = { projection: { _id: 1 } };
    const cardList = await cards.find(query).toArray();

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
router.get('/groups', async function(req, res, next) {
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
      groups: groupList
    });
  } catch (err) {
    console.log(err);
  } finally {
    db.close();
  }
});

/* GET member */
router.get('/members/:group', async function(req, res, next) {
  const group = req.params.group;
  // console.log('/members/:group', group);

  try {
    await db.connect();
    console.log('Connection Success');

    const database = db.db('HanDOL');
    const members = database.collection('members');

    const query = { g_id: Number(group) };
    // const options = { projection: { _id: 1 } };
    const memberList = await members.find(query).toArray();

    res.status(200).send({
      message: 'successfully get member list',
      members: memberList
    });
  } catch (err) {
    console.log(err);
  } finally {
    db.close();
  }
});

/* GET album */
router.get('/albums/:group', async function(req, res, next) {
  const group = req.params.group;
  // console.log('/albums/:group', group);

  try {
    await db.connect();
    console.log('Connection Success');

    const database = db.db('HanDOL');
    const albums = database.collection('albums');

    const query = { g_id: Number(group) };
    // const options = { projection: { _id: 1 } };
    const albumList = await albums.find(query).toArray();

    res.status(200).send({
      message: 'successfully get album list',
      albums: albumList
    });
  } catch (err) {
    console.log(err);
  } finally {
    db.close();
  }
});

/* GET version */
router.get('/versions/:album', async function(req, res, next) {
  const version = req.params.album;

  try {
    await db.connect();
    console.log('Connection Success');

    const database = db.db('HanDOL');
    const versions = database.collection('versions');

    const query = { a_id: Number(version) };
    // const options = { projection: { _id: 1 } };
    const versionList = await versions.find(query).toArray();

    res.status(200).send({
      message: 'successfully get version list',
      versions: versionList
    });
  } catch (err) {
    console.log(err);
  } finally {
    db.close();
  }
});

module.exports = router;
