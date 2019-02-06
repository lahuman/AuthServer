'use strict';

const express = require('express');
const router = express.Router();

const models = reqlib('/models');
const winston = reqlib('/config/winston');

router.get('/', function (req, res, next) {
    console.log(winston);
    winston.info(models.User);
    models.User.findAll({
        include: [models.Task]
    }).then(function (users) {
        res.send(users);
    });
});

router.get('/:user_id', (req, res) => {
    models.User.findOne({
        where: { user_id: req.params.user_id }
    }).then(res.send);
});

router.post('/', (req, res) => {
    models.User.create(req.body).then(() => {
        res.redirect('/');
    });
});

router.put('/:user_id', (req, res) => {
    models.User.update(req.body,
        { where: { user_id: req.params.user_id }, returning: true })
        .then((result) => {
            res.redirect('/');
        });
});
module.exports = router;