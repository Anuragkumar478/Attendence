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
//  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjgxZWRhMjM3MWQ5MDg1MGNmZmNmMjBjIiwicm9sZSI6InN0dWRlbnQifSwiaWF0IjoxNzQ2ODU2ODgwLCJleHAiOjE3NDY4NzQ4ODB9.yG2xOaQCQBGmwxfMp0rP0Mpir1h7Li8315WAcj4b-S8",
//     "user": {
//         "id": "681eda2371d90850cffcf20c",
//         "name": "Manisha Tiwari",
//         "role": "student"
//     }
// }