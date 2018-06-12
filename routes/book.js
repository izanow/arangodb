var express = require('express');
var router = express.Router();
const db =  require('../database');
const TokenGenerator = require('uuid-token-generator');
const tokgen = new TokenGenerator();

const collection = db.collection('Book');

/* GET ALL BOOKS */
router.get('/', function(req, res, next) {
  collection.all().then(
    docs => res.send(docs._result),
    err => console.error('Failed to fetch all documents:', err)
  )
});

/* GET SINGLE BOOK BY ID */
router.get('/:token', function(req, res, next) {
  collection.all().then(
    docs => {
      docs._result.map(doc => doc._key === req.params.token ? res.send(doc) : null);
    },
    err => console.error('Failed to fetch document:', err)
  )
});

/* SAVE BOOK */
router.post('/', function(req, res, next) {
  const doc = Object.assign({_key: tokgen.generate()}, req.body);
  collection.save(doc).then(
    meta => {
      console.log('Document saved:', meta._rev);
      res.send(doc)
    },
    err => console.error('Failed to save document:', err)
  );
});

/* UPDATE BOOK */
router.put('/:token', function(req, res, next) {
  collection.update(req.params.token, req.body).then(
    meta => {
      console.log('Document updated:', meta._rev);
      res.send(req.body)
      },
      err => console.error('Failed to update document:', err)
  );
});

/* DELETE BOOK */
router.delete('/:token', function(req, res, next) {
  collection.remove(req.params.token).then(
    () => console.log('Document removed'),
    err => console.error('Failed to remove document', err)
  );
});

module.exports = router;
