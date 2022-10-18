const { Sequelize } = require("sequelize");
const Product = require("../models/ProductModel");
const Users = require("../models/UserModel");

const { Op } = Sequelize;

const getProducts = async (req, res) => {
  try {
    if (req.role === "admin") {
      const products = await Product.findAll({
        attributes: ["name", "uuid", "price"],
        include: [
          {
            model: Users,
            attributes: ["name", "email"],
          },
        ],
      });
      res.status(200).json(products);
    } else {
      const products = await Product.findAll({
        attributes: ["name", "uuid", "price"],
        where: {
          userId: req.userId,
        },
        include: [
          {
            model: Users,
            attributes: ["name", "email"],
          },
        ],
      });
      res.status(200).json(products);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!product)
      return res.status(400).json({ message: "Product tidak ditemukan" });

    if (req.role === "admin") {
      const products = await Product.findOne({
        attributes: ["name", "uuid", "price"],
        where: {
          id: req.params.id,
        },
        include: [
          {
            model: Users,
            attributes: ["name", "email"],
          },
        ],
      });
      res.status(200).json(products);
    } else {
      const products = await Product.findAll({
        attributes: ["name", "uuid", "price"],
        where: {
          [Op.and]: [{ userId: req.userId }, { id: req.params.id }],
        },
        include: [
          {
            model: Users,
            attributes: ["name", "email"],
          },
        ],
      });
      res.status(200).json(products);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createProduct = async (req, res) => {
  const { name, price } = req.body;

  try {
    const product = await Product.create({
      name,
      price,
      userId: req.userId,
    });
    res.status(201).json({ product });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!product)
      return res.status(400).json({ message: "Product tidak ditemukan" });

    const { name, price } = req.body;
    if (req.role === "admin") {
      const products = await Product.update(
        { name, price },
        {
          where: {
            uuid: req.params.id,
          },
        }
      );
      res.status(200).json(products);
    } else {
      if (req.userId !== product.userId)
        return res.status(404).json({ message: "Akses terlarang" });
      const products = await Product.update(
        { name, price },
        {
          where: {
            [Op.and]: [{ userId: req.userId }, { uuid: req.params.id }],
          },
        }
      );
      res.status(200).json(products);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!product)
      return res.status(400).json({ message: "Product tidak ditemukan" });

    if (req.role === "admin") {
      const products = await Product.destroy({
        where: {
          uuid: req.params.id,
        },
      });
      res.status(200).json(products);
    } else {
      if (req.userId !== product.userId)
        return res.status(404).json({ message: "Akses terlarang" });
      const products = await Product.destroy({
        where: {
          [Op.and]: [{ userId: req.userId }, { uuid: req.params.id }],
        },
      });
      res.status(200).json(products);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
