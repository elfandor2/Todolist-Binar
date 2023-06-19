const router = require('express').Router();
const { ListsController } = require('../controllers/lists.controller');
const { authorization } = require('../middlewares/authorization');
const listsController = new ListsController

router.post('/lists', authorization(), listsController.postLists)
router.get('/lists', authorization(), listsController.getLists)
router.patch('/lists/:id', authorization(), listsController.completeList)
router.delete('/lists/:id', authorization(), listsController.deleteList)

module.exports = router