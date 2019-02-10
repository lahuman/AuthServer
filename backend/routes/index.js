const express = require('express');

const router = express.Router();

router.use('/users', require('./users'));
router.use('/roles', require('./roles'));

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

module.exports = router;
