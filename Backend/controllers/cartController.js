
const Cart = require('../models/cartModel');
const Product = require('../models/productModel');


exports.addToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [], totalPrice: 0 });
    }

    const existingItem = cart.items.find(item => item.productId.toString() === productId);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    const product = await Product.findById(productId);
    cart.totalPrice += product.price * quantity;
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getCart = async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.findOne({ userId }).populate('items.productId');
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.removeItem = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Product not in cart' });
    }

    const product = await Product.findById(productId);
    cart.totalPrice -= product.price * cart.items[itemIndex].quantity;

    cart.items.splice(itemIndex, 1);
    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.clearCart = async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = [];
    cart.totalPrice = 0;
    await cart.save();

    res.status(200).json({ message: 'Cart cleared successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


