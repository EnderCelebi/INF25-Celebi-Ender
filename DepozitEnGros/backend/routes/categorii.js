const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM categorii ORDER BY id_categorie');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  const body = req.body;
  const nume = body.nume;

  if (!nume) return res.status(400).json({ error: 'Numele este obligatoriu' });

  try {
    const result = await pool.query(
      'INSERT INTO categorii (nume) VALUES ($1) RETURNING *',
      [nume]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const nume = body.nume;

  if (!nume) return res.status(400).json({ error: 'Numele este obligatoriu' });

  try {
    const result = await pool.query(
      'UPDATE categorii SET nume=$1 WHERE id_categorie=$2 RETURNING *',
      [nume, id]
    );

    if (result.rows.length === 0) return res.status(404).json({ error: 'Categoria nu exista' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM categorii WHERE id_categorie=$1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Categoria nu exista' });
    res.json({ message: 'Categoria stearsa cu succes' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
