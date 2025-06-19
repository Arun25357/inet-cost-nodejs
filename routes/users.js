var express = require('express');
var router = express.Router();
var userSchema = require('../models/user.model');
const bcrypt = require('bcrypt');



router.get('/', async function(req, res, next) {
  let users = await userSchema.find({})
  res.send(users);
});

router.get('/:id', async function(req, res, next) {
  let user = await userSchema.findById(req.params.id);
  if (user) {
    res.send(user);
  } else {
    res.status(404).send({ message: 'User not found' });
  }
});

router.put('/update/:id', async function(req, res, next) {
  let user = await userSchema.findByIdAndUpdate(req.params.id, {
    username: req.body.username,
    password: req.body.password,
    fistName: req.body.fistName,
    lastName: req.body.lastName,
    age: req.body.age,
    sex: req.body.sex,
  }, { new: true });
  if (user) {
    res.send({ message: 'User updated successfully', user: user });
  } else {
    res.status(404).send({ message: 'User not found' });
  }
});

router.delete('/delete/:id', async function(req, res, next) {
  let user = await userSchema.findByIdAndDelete(req.params.id);
  if (user) {
    res.send({ message: 'User deleted successfully' });
  } else {
    res.status(404).send({ message: 'User not found' });
  }
});

router.post('/register', async function(req, res, next) {
  let user = new userSchema({
    username: req.body.username,
    password: req.body.password,
    fistName: req.body.fistName,
    lastName: req.body.lastName,
    age: req.body.age,
    sex: req.body.sex,
  });
  await user.save();
  res.send({ message: 'User created successfully', user: user });
});

router.post('/login', async function(req, res, next) {
  const { username, password } = req.body;
  try {
    
    const user = await userSchema.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'ไม่พบผู้ใช้' });
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'รหัสผ่านไม่ถูกต้อง' });
    }
    
    res.send({ message: 'เข้าสู่ระบบสำเร็จ', user: user });
  } catch (err) {
    res.status(500).json({ message: 'เกิดข้อผิดพลาด' });
    console.error(err);
  }
});

module.exports = router;