const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const { Order, OrderProduct, CartProduct, sequelize } = require('../sequelize');

router.get('/', auth, async (req, res) => {
  const orders = await Order.findAll({
    where: { userId: req.user.id},
    include: [{
      model: OrderProduct,
      required: false
    }]
  });
  res.send(orders);
});

router.post('/', auth, async (req, res) => {
  let order = Order.build({
    user_id: req.user.id,
    shipping_option_id: req.body.shipping_option_id,
  });

  const cart_products = await CartProduct.findAll({
    where: { userId: user_id }
  });

  return sequelize.transaction( t => {
    return order.save({ transaction: t }).then( o => {
        if (req.body.order_products.length) { // if cart_products.length
          // * Possible problem: product_id pointed to wrong product by client *
          // cart_products.forEach
          req.body.order_products.forEach( op => { op.order_id = o.id });
          return OrderProduct.bulkCreate(req.body.order_product, { transaction: t });
        }
        return order;
      });
    }).then( result => {
      // **** Empty Cart for current user ***
      CartProduct.destroy({ where: { id: req.user.id }});
      res.send(order);
    }).catch( err =>  {
      res.status(400).send(err);
    });
});

router.get('/:id', auth, async (req, res) => {
  const order = await Order.findOne({
    where: { id: req.params.id },
    include: {
      model: OrderProduct,
      where: { orderId: req.params.id },
      required: false
    }
  });

  if (!order) {
    res.status(404).send('Order with submitted ID not found');
  } else { // Check for current user
    if (req.user.id !== order.userId) {
      res.status(403).send('Forbidden');
    } else {
      res.send(order);
    }
  }
});

router.put('/:id', [auth, admin], async (req, res) => {
  let order = await Order.findOne({ where: { id: req.params.id } });
  if (!order) {
    return res.status(404).send('Order with submitted ID not found');
  }

  try {
    const updated_order = await order.update({
      userId: req.body.userId,
      shippingOptionId: req.body.shippingOptionId,
    });
    res.send(updated_order);
  } catch(err) {
    res.status(400).send(err);
  }
});

router.delete('/:id', [auth, admin], async (req, res) => {
  const order = await Order.findOne({ where: { id: req.params.id } });
  if (!order) {
    res.status(404).send('Order ID not found');
  } else {
    await order.destroy(); // Auto-deletes order_products
    res.send(order);
  }
});

module.exports = router;
