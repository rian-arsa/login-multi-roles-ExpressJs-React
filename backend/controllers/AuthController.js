const User = require("../models/UserModel");
const argon2 = require("argon2");

const login = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (!user) return res.status(404).json({ message: "User tidak terdaftar" });
    const match = await argon2.verify(user.password, req.body.password);
    if (!match) return res.status(400).json({ message: "Password Salah" });
    req.session.userId = user.uuid;
    const uuid = user.uuid;
    const name = user.name;
    const email = user.email;
    const role = user.role;
    res.status(200).json({ uuid, name, email, role });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const Me = async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Mohon login ke akun Anda" });
  }
  const user = await User.findOne({
    attributes: ["uuid", "name", "email", "role"],
    where: {
      uuid: req.session.userId,
    },
  });
  if (!user) return res.status(404).json({ message: "User tidak terdaftar" });
  res.status(200).json(user);
};

const logout = async (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) return res.status(400).json({ message: "Tidak dapat logout" });
      res.status(200).json({ message: "Anda telah logout" });
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  login,
  logout,
  Me,
};
