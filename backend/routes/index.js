const express = require('express');
const moment = require('moment');

const models = reqlib('/models');
const winston = reqlib('/config/winston');

const router = express.Router();


/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.post('/login', (req, res, next) => {
  const loginInfo = req.body;
  if (!Object.prototype.hasOwnProperty.call(loginInfo, 'user_id')
    || !Object.prototype.hasOwnProperty.call(loginInfo, 'password')) {
    res.json({ status: 'error', message: 'Invalid Prameter' });
  }
  else {
    models.LoginHistorys.count({ where: { user_id: loginInfo.user_id, login_success: 'N', created_at: { [models.Sequelize.Op.gt]: moment().subtract(20, 'minutes').toDate() } } }).then((c) => {
      if (c > 5) {
        res.json({ status: 'error', message: 'Login failed several times. Please try again in 10 minutes.' });
      }
      else {
        models.Users.findOne({
          where: { user_id: loginInfo.user_id, password: loginInfo.password },
          include: [models.Roles]
        }).then((u) => {
          if (u) {
            const userInfo = {
              user_id: u.user_id,
              password: u.password,
              desc: u.description,
              role: u.Roles.map(r => r.role_name)
            };
            res.json({ status: 'success', userInfo });
            loginInfo.login_success = 'Y';
          }
          else {
            res.json({ status: 'error', message: 'check ID or PW' });
            loginInfo.login_success = 'N';
          }
          models.LoginHistorys.create(loginInfo);
        });
      }
    });
  }
});

const isAdmin = (req, res, next) => {
  if (req.session.isAdmin) {
    next();
  }
  else {
    res.json({ status: 403, message: 'Login failed' });
  }
};


router.use('/users', isAdmin, require('./users'));
router.use('/roles', isAdmin, require('./roles'));


module.exports = router;
