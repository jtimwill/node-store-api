const express = require('express');
const router = express.Router();
const { Category } = require('../sequelize');

router.get('/', auth, async (req, res) => {});
router.get(`/:id`, [auth, admin], async (req, res) => {});
router.post('/', [auth, admin], async (req, res) => {});
router.put('/:id', [auth, admin], async (req, res) => {});
router.delete('/:id', [auth, admin], async (req, res) => {});

module.exports = router;
