

const express = require('express');

const router = express.Router();

const models = reqlib('/models');
const winston = reqlib('/config/winston');

router.get('/', (req, res, next) => {
  models.Roles.findAll().then(roles => res.send(roles));
});

router.get('/:role_name', (req, res) => {
  models.Roles.findOne({
    where: { role_name: req.params.role_name }
  }).then(res.send);
});

router.post('/', (req, res) => {
  models.Roles.create(req.body).then(() => {
    res.redirect('/');
  }).catch((err) => {
    winston.error(err);
  });
});

router.post('/:id', (req, res) => {
  const idList = req.body;
  const roleId = req.params.id;
  const relations = [];

  idList.forEach((idJson) => {
    relations.push(models.UserRoles.create({ u_id: idJson.user_id, r_id: roleId }).then((r) => {
      winston.debug(r);
    }));
  });
  Promise.all(relations).then(r => res.send(r));
});

router.put('/:role_name', (req, res) => {
  models.Roles.update(req.body,
    { where: { role_name: req.params.role_name }, returning: true })
    .then((result) => {
      res.redirect('/');
    });
});
module.exports = router;
