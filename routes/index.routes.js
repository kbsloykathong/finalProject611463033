const express = require("express");
const router = express.Router();
const index_ctl = require('../controllers/index.controller');

router.get('/', index_ctl.getHomePage);
router.get('/edituser', index_ctl.editUsers);
// router.get('/editpost/:id', index_ctl.editPosts);
router.post('/adduser', index_ctl.addUsers);
router.post('/post', index_ctl.addPost);
router.post('/updateuser', index_ctl.updateUser);
router.post('/login', index_ctl.login);
router.get('/logout', index_ctl.logout);
router.get('/delete/:id', index_ctl.delete);

module.exports = router;