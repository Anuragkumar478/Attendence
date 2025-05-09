const Attendance = require('../models/Attendance');
const Student = require('../models/Student');

// Mark attendance
exports.markAttendance = async (req, res) => {
  try {
    const { studentId, status, subject } = req.body;
    const student = await Student.findById(studentId);
    if (!student) return res.status(404).json({ msg: 'Student not found' });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const existingAttendance = await Attendance.findOne({
      student: studentId,
      date: { $gte: today },
      subject
    });

    if (existingAttendance) {
      return res.status(400).json({ msg: 'Attendance already marked for today' });
    }

    const attendance = new Attendance({
      student: studentId,
      status,
      subject,
      markedBy: req.user.id
    });

    await attendance.save();
    res.json(attendance);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get attendance by student
exports.getAttendanceByStudent = async (req, res) => {
  try {
    const attendance = await Attendance.find({ student: req.params.studentId })
      .sort({ date: -1 })
      .populate('markedBy', 'name');
    res.json(attendance);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Update attendance
exports.updateAttendance = async (req, res) => {
  try {
    const { status } = req.body;
    let attendance = await Attendance.findById(req.params.id);
    if (!attendance) return res.status(404).json({ msg: 'Attendance not found' });

    attendance.status = status || attendance.status;
    await attendance.save();
    res.json(attendance);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};