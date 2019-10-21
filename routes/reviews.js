const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const { findProduct } = require('../middleware/find');
const { Product, Review } = require('../sequelize');
const prefix = "/:productId/reviews";

router.get(`${prefix}/`, [auth, findProduct], async (req, res) => {
  const reviews = await Review.findAll({
    where: { product_id: req.params.productId }
  });
  res.send(reviews);
});

router.post(`${prefix}/`, [auth, findProduct], async (req, res) => {
  try {
    const review = await Review.create({
      userId: req.user.id,
      productId: req.params.productId,
      title: req.body.title,
      body: req.body.body,
      rating: req.body.rating
    });
    res.send(review);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get(`${prefix}/:id`, [auth, findProduct], async (req, res) => {
  const review = await Review.findOne({ where: { id: req.params.id }});
  if (!review) {
    return res.status(404).send('Review with submitted ID not found');
  }
  res.send(review);
});

router.put(`${prefix}/:id`, [auth, findProduct], async (req, res) => {
  const review = await Review.findOne({ where: { id: req.params.id }});
  if (!review) {
    return res.status(404).send('Review with submitted ID not found');
  }
  try {
    const updated_review = await review.update({
      userId: req.user.id,
      productId: req.params.productId,
      title: req.body.title,
      body: req.body.body,
      rating: req.body.rating
    });
    res.send(updated_review);
  } catch(err) {
    res.status(400).send(err);
  }
});

router.delete(`${prefix}/:id`, [auth, admin, findProduct], async (req, res) => {
  const review = await Review.findOne({ where: { id: req.params.id }});
  if (!review) {
    return res.status(404).send('Review with submitted ID not found');
  }
  await review.destroy();
  res.send(review);
});

module.exports = router;
