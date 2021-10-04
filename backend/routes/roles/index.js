

const express = require('express');

const router = express.Router();

const models = reqlib('/models');
const winston = reqlib('/config/winston');

/**
 * @swagger
 * tags:
 *   name: Role
 *   description: 권한 정보 관리
 * definitions:
 *   RoleRequest:
 *     type: object
 *   RoleResponse:
 *     type: object
 */


/**
 * @swagger
 *  paths:
 *    /roles:
 *      get:
 *        tags:
 *        - "Role"
 *        summary: "권한 목록 조회"
 *        description: ""
 *        consumes:
 *        - "application/json"
 *        produces:
 *        - "application/json"
 *        responses:
 *          200:
 *            description: "권한 목록"
 *            schema:
 *              $ref: "#/definitions/RoleResponse"
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
  models.Roles.findAll().then(roles => res.send(roles));
});


/**
 * @swagger
 *  paths:
 *    /roles/{role_name}:
 *      get:
 *        tags:
 *        - "Role"
 *        summary: "권한  조회"
 *        description: ""
 *        consumes:
 *        - "application/json"
 *        produces:
 *        - "application/json"
 *        parameters:
 *        - in: path
 *          name: role_name
 *          schema:
 *            type: string
 *          required: true
 *          description:  ID of the role to get
 *        responses:
 *          200:
 *            description: "권한 정보"
 *            schema:
 *              $ref: "#/definitions/RoleResponse"
 *          400:
 *            description: "잘못된 데이터"
 *            schema:
 *              $ref: "#/definitions/Response_error"
 *          500:
 *            description: "데이터 조회 실패"
 *            schema:
 *              $ref: "#/definitions/Response_error"
 */
router.get('/:role_name', (req, res) => {
  models.Roles.findOne({
    where: { role_name: req.params.role_name }
  }).then(res.send);
});


/**
 * @swagger
 *  paths:
 *    /roles:
 *      post:
 *        tags:
 *        - "Role"
 *        summary: "권한 정보 등록"
 *        description: ""
 *        consumes:
 *        - "application/json"
 *        produces:
 *        - "application/json"
 *        parameters:
 *        - in: "body"
 *          name: "body"
 *          description: "권한 정보"
 *          required: true
 *          schema:
 *            $ref: "#/definitions/RoleRequest"
 *        responses:
 *          200:
 *            description: "권한 정보 저장 결과"
 *            schema:
 *              $ref: "#/definitions/RoleResponse"
 *          400:
 *            description: "잘못된 데이터"
 *            schema:
 *              $ref: "#/definitions/Response_error"
 *          500:
 *            description: "권한 정보 저장 실패"
 *            schema:
 *              $ref: "#/definitions/Response_error"
 */
router.post('/', async (req, res) => {
  const roles = await models.Roles.create(req.body);
  res.json(roles);
});


/**
 * @swagger
 *  paths:
 *    /roles/{id}:
 *      post:
 *        tags:
 *        - "Role"
 *        summary: "권한 할당"
 *        description: ""
 *        consumes:
 *        - "application/json"
 *        produces:
 *        - "application/json"
 *        parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: ID of the role to get
 *        - in: "body"
 *          name: "body"
 *          description: "권한 할당 정보"
 *          required: true
 *          schema:
 *            $ref: "#/definitions/RoleRequest"
 *        responses:
 *          200:
 *            description: "권한 정보 저장 결과"
 *            schema:
 *              $ref: "#/definitions/UserResponse"
 *          400:
 *            description: "잘못된 데이터"
 *            schema:
 *              $ref: "#/definitions/Response_error"
 *          500:
 *            description: "권한 정보 저장 실패"
 *            schema:
 *              $ref: "#/definitions/Response_error"
 */
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


/**
 * @swagger
 *  paths:
 *    /users/{role_name}:
 *      put:
 *        tags:
 *        - "Role"
 *        summary: "권한 정보 수정"
 *        description: ""
 *        consumes:
 *        - "application/json"
 *        produces:
 *        - "application/json"
 *        parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: ID of the role to get
 *        - in: "body"
 *          name: "body"
 *          description: "권한 정보"
 *          required: true
 *          schema:
 *            $ref: "#/definitions/RoleRequest"
 *        responses:
 *          200:
 *            description: "권한 정보 저장 결과"
 *            schema:
 *              $ref: "#/definitions/RoleResponse"
 *          400:
 *            description: "잘못된 데이터"
 *            schema:
 *              $ref: "#/definitions/Response_error"
 *          500:
 *            description: "권한 정보 저장 실패"
 *            schema:
 *              $ref: "#/definitions/Response_error"
 */
router.put('/:id', async (req, res) => {
  const roles = await models.Roles.update(req.body,
    { where: { id: req.params.id }, returning: true });
  res.json(roles);
});
module.exports = router;
