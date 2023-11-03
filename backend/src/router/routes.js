const router = require('express').Router();
const { createUser,updateUser,deleteUser,getUsers,loginUser} = require('../controller/userController');
const {getRoles} =require('../controller/rolesController')

router.post("/users", createUser);
router.put("/users/:userId", updateUser);
router.delete("/users/:userId", deleteUser);
router.get("/users",getUsers)
router.post('/login', loginUser);
router.get('/roles',getRoles)

module.exports = router;

