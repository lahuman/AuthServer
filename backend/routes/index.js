const express = require('express');

const router = express.Router();

router.use('/users', require('./users'));
router.use('/roles', require('./roles'));

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

const isAdmin = (req, res, next) => {
  if (req.session.isAdmin) {
    next();
  }
  else {
    res.json({ status: 403, message: 'Login failed' });
  }
};

module.exports = router;
