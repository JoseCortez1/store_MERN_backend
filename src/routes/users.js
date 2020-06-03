const {Router} = require('express')
const  router = Router();

const verifyToken =  require('../controllers/verifyToken')
const {getUser,loginUser, createUser, getUsers, deleteUser, updateUser} = require('../controllers/users.controllers')

router.route('/')
    .get(verifyToken,getUsers)
    .post(verifyToken, createUser)
router.route('/:id')
    .delete(verifyToken,deleteUser)
    .put(verifyToken,updateUser)
router.route('/login/')
    .get(verifyToken,getUser)
    .post(loginUser)


module.exports = router;