const express = require('express');

const router = express.Router();

const models = reqlib('/models');
const winston = reqlib('/config/winston');

/**
 * @swagger
 * tags:
 *   name: User
 *   description: 사용자 정보 관리
 * definitions:
 *   UserRequest:
 *     type: object
 *   UserResponse:
 *     type: object
 */

 
/**
 * @swagger
 *  paths:
 *    /users:
 *      get:
 *        tags:
 *        - "User"
 *        summary: "사용자 목록 조회"
 *        description: ""
 *        consumes:
 *        - "application/json"
 *        produces:
 *        - "application/json"
 *        responses:
 *          200:
 *            description: "사용자 목록"
 *            schema:
 *              $ref: "#/definitions/UserResponse"
 *          400:
 *            description: "잘못된 데이터"
 *            schema:
 *              $ref: "#/definitions/Response_error"
 *          500:
 *            description: "데이터 조회 실패"
 *            schema:
 *              $ref: "#/definitions/Response_error"
 */
router.get('/', (req, res, next) => {
  models.Users.findAll({
    include: [models.Roles]
  }).then((users) => {
    res.send(users);
  });
});


/**
 * @swagger
 *  paths:
 *    /users/{user_id}:
 *      get:
 *        tags:
 *        - "User"
 *        summary: "사용자  조회"
 *        description: ""
 *        consumes:
 *        - "application/json"
 *        produces:
 *        - "application/json"
 *        parameters:
 *        - in: path
 *          name: user_id
 *          schema:
 *            type: string
 *          required: true
 *          description: ID of the user to get
 *        responses:
 *          200:
 *            description: "사용자 정보"
 *            schema:
 *              $ref: "#/definitions/UserResponse"
 *          400:
 *            description: "잘못된 데이터"
 *            schema:
 *              $ref: "#/definitions/Response_error"
 *          500:
 *            description: "데이터 조회 실패"
 *            schema:
 *              $ref: "#/definitions/Response_error"
 */
router.get('/:user_id', (req, res) => {
  models.Users.findOne({
    where: { user_id: req.params.user_id }
  }).then(res.send);
});

 
/**
 * @swagger
 *  paths:
 *    /users:
 *      post:
 *        tags:
 *        - "User"
 *        summary: "사용자 정보 등록"
 *        description: ""
 *        consumes:
 *        - "application/json"
 *        produces:
 *        - "application/json"
 *        parameters:
 *        - in: "body"
 *          name: "body"
 *          description: "사용자 정보"
 *          required: true
 *          schema:
 *            $ref: "#/definitions/UserRequest"
 *        responses:
 *          200:
 *            description: "사용자 정보 저장 결과"
 *            schema:
 *              $ref: "#/definitions/UserResponse"
 *          400:
 *            description: "잘못된 데이터"
 *            schema:
 *              $ref: "#/definitions/Response_error"
 *          500:
 *            description: "사용자 정보 저장 실패"
 *            schema:
 *              $ref: "#/definitions/Response_error"
 */
router.post('/', (req, res) => {
  models.Users.create(req.body).then(() => {
    res.redirect('/');
  });
});


/**
 * @swagger
 *  paths:
 *    /users/{user_id}:
 *      put:
 *        tags:
 *        - "User"
 *        summary: "사용자 정보 수정"
 *        description: ""
 *        consumes:
 *        - "application/json"
 *        produces:
 *        - "application/json"
 *        parameters:
 *        - in: path
 *          name: user_id
 *          schema:
 *            type: string
 *          required: true
 *          description: ID of the user to get
 *        - in: "body"
 *          name: "body"
 *          description: "사용자 정보"
 *          required: true
 *          schema:
 *            $ref: "#/definitions/UserRequest"
 *        responses:
 *          200:
 *            description: "사용자 정보 저장 결과"
 *            schema:
 *              $ref: "#/definitions/UserResponse"
 *          400:
 *            description: "잘못된 데이터"
 *            schema:
 *              $ref: "#/definitions/Response_error"
 *          500:
 *            description: "사용자 정보 저장 실패"
 *            schema:
 *              $ref: "#/definitions/Response_error"
 */
router.put('/:user_id', (req, res) => {
  models.Users.update(req.body,
    { where: { user_id: req.params.user_id }, returning: true })
    .then((result) => {
      res.redirect('/');
    });
});

module.exports = router;
