const express = require('express');
const router = express.Router();
const { CartProduct } = require('../sequelize');

router.get('/', async (req, res) => {});
router.post('/', async (req, res) => {});
router.put('/:id', async (req, res) => {});
router.delete('/:id', async (req, res) => {});
router.delete('/', async (req, res) => {});

module.exports = router;
