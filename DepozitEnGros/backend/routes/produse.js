const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        p.id_produs,
        p.nume,
        p.descriere,
        p.pret_achizitie,
        p.pret_vanzare,
        p.stoc,
        p.id_categorie,
        c.nume AS categorie,
        p.id_furnizor,
        f.nume AS furnizor
      FROM produse p
      LEFT JOIN categorii c ON p.id_categorie = c.id_categorie
      LEFT JOIN furnizori f ON p.id_furnizor = f.id_furnizor
      ORDER BY p.id_produs
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.post('/', async (req, res) => {
  const body = req.body;

  const id_categorie = body.id_categorie;
  const id_furnizor = body.id_furnizor;
  const nume = body.nume;
  const descriere = body.descriere || null;
  const pret_achizitie = body.pret_achizitie || 0;
  const pret_vanzare = body.pret_vanzare || 0;
  const stoc = body.stoc || 0;

  if (!nume || !id_categorie || !id_furnizor) {
    return res.status(400).json({ error: 'Nume, categorie și furnizor sunt obligatorii' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO produse
       (id_categorie, id_furnizor, nume, descriere, pret_achizitie, pret_vanzare, stoc)
       VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
      [id_categorie, id_furnizor, nume, descriere, pret_achizitie, pret_vanzare, stoc]
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
  const descriere = body.descriere || null;
  const pret_achizitie = body.pret_achizitie || 0;
  const pret_vanzare = body.pret_vanzare || 0;
  const stoc = body.stoc || 0;
  const id_categorie = body.id_categorie;
  const id_furnizor = body.id_furnizor;

  if (!nume || !id_categorie || !id_furnizor) {
    return res.status(400).json({ error: 'Nume, categorie și furnizor sunt obligatorii' });
  }

  try {
    const result = await pool.query(
      `UPDATE produse SET 
         nume=$1, descriere=$2, pret_achizitie=$3, pret_vanzare=$4, stoc=$5, id_categorie=$6, id_furnizor=$7
       WHERE id_produs=$8 RETURNING *`,
      [nume, descriere, pret_achizitie, pret_vanzare, stoc, id_categorie, id_furnizor, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Produsul nu exista' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM produse WHERE id_produs=$1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Produsul nu exista' });
    res.json({ message: 'Produs sters cu succes' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
