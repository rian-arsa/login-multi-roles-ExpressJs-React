const User = require("../models/UserModel");
const argon2 = require("argon2");

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["uuid", "name", "email", "role"],
    });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        uuid: req.params.id,
      },
      attributes: ["uuid", "name", "email", "role"],
    });
    if (!user) return res.status(404).json({ message: "User tidak ditemukan" });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createUser = async (req, res) => {
  const { name, email, password, confPassword, role } = req.body;

  if (password !== confPassword)
    return res.status(400).json({ message: "Password tidak sesuai" });
  const hashPassword = await argon2.hash(password);

  try {
    const response = await User.create({
      name: name,
      email: email,
      password: hashPassword,
      role: role,
    });
    res.status(201).json(response);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateUser = async (req, res) => {
  const { name, email, password, confPassword, role } = req.body;
  const user = await User.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!user) return res.status(404).json({ message: "User tidak ditemukan" });
  let hashPassword = "";
  if (password === null || password === "") {
    hashPassword = user.password;
  } else {
    hashPassword = await argon2.hash(password);
  }
  if (password !== confPassword)
    return res.status(400).json({ message: "Password tidak sesuai" });

  try {
    const response = await User.update(
      {
        name: name,
        email: email,
        password: hashPassword,
        role: role,
      },
      {
        where: {
          id: user.id,
        },
      }
    );
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteUser = async (req, res) => {
  const user = await User.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!user) return res.status(404).json({ message: "User tidak ditemukan" });

  try {
    const response = await User.destroy({
      where: {
        id: user.id,
      },
    });
    res.status(201).json(response);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
