const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const studentController = require('../controllers/student');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, './uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + file.originalname)
});

const upload = multer({ storage });

router.get('/', auth, studentController.getAllStudents);
router.get('/:id', auth, studentController.getStudentById);
router.put('/:id', auth, studentController.updateStudent);
router.post('/:id/upload', auth, upload.single('profilePic'), studentController.uploadProfilePic);
router.get('/:id/summary', auth, studentController.getStudentSummary);

module.exports = router;