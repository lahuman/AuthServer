'use strict';

const express = require('express');
const router = express.Router();

const models = reqlib('/models');
const winston = reqlib('/config/winston');

router.get('/',  (req, res, next) => {
    models.Users.findAll({
        include: [models.Services]
    }).then( (users) => {
        res.send(users);
    });
});

router.get('/:user_id', (req, res) => {
    models.Users.findOne({
        where: { user_id: req.params.user_id }
    }).then(res.send);
});

router.post('/', (req, res) => {
    models.Users.create(req.body).then(() => {
        res.redirect('/');
    });
});

router.put('/:user_id', (req, res) => {
    models.Users.update(req.body,
        { where: { user_id: req.params.user_id }, returning: true })
        .then((result) => {
            res.redirect('/');
        });
});
module.exports = router;