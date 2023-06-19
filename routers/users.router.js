const router = require('express').Router();
const { UsersController } = require('../controllers/users.controller');
const { authorization } = require('../middlewares/authorization');
const usersController = new UsersController

router.post('/user', usersController.register)
router.post('/login', usersController.login)
router.get('/user', authorization(), usersController.getDataUser)


module.exports = router