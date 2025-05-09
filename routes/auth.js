const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const auth=require('../middleware/auth')

router.post('/register/student', authController.registerStudent);
router.post('/register/teacher', authController.registerTeacher);
router.post('/login', authController.login);
router.get('/', auth, authController.getCurrentUser);

module.exports = router;