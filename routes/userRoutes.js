const express = require('express');

const router = express.Router();

const getAllUsers = (req, res) => {
  return res.status(500).json({ status: 'error', message: 'getAllUsers' });
};

const createUser = (req, res) => {
  return res.status(500).json({ status: 'error', message: 'createUser' });
};

const getUser = (req, res) => {
  return res.status(500).json({ status: 'error', message: 'getUser' });
};

const updateUser = (req, res) => {
  return res.status(500).json({ status: 'error', message: 'updateUser' });
};

const deleteUser = (req, res) => {
  return res.status(500).json({ status: 'error', message: 'deleteUser' });
};

router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
