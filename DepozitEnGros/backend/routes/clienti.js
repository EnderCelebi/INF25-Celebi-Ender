const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM clienti ORDER BY id_client');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  const body = req.body;
  const nume = body.nume;
  const telefon = body.telefon || null;
  const email = body.email || null;

  if (!nume) return res.status(400).json({ error: 'Numele este obligatoriu' });

  try {
    const result = await pool.query(
      'INSERT INTO clienti (nume, telefon, email) VALUES ($1,$2,$3) RETURNING *',
      [nume, telefon, email]
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
  const telefon = body.telefon || null;
  const email = body.email || null;

  if (!nume) return res.status(400).json({ error: 'Numele este obligatoriu' });

  try {
    const result = await pool.query(
      'UPDATE clienti SET nume=$1, telefon=$2, email=$3 WHERE id_client=$4 RETURNING *',
      [nume, telefon, email, id]
    );

    if (result.rows.length === 0) return res.status(404).json({ error: 'Clientul nu exista' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM clienti WHERE id_client=$1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Clientul nu exista' });
    res.json({ message: 'Client sters cu succes' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
