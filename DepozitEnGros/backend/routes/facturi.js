const express = require('express');
const router = express.Router();
const pool = require('../db');


router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT f.id_factura, co.id_comanda, cl.nume AS client, f.data_emitere, f.data_scadenta, f.total_facturat, f.tva_total, f.modalitate_plata, f.status_plata
      FROM facturi f
      LEFT JOIN comenzi co ON f.id_comanda = co.id_comanda
      LEFT JOIN clienti cl ON co.id_client = cl.id_client
      ORDER BY f.id_factura
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.post('/', async (req, res) => {
  const { id_comanda, data_scadenta, modalitate_plata, status_plata, observatii } = req.body;

  if (!id_comanda) {
    return res.status(400).json({ error: 'Comanda este obligatorie' });
  }

  try {
    const comanda = await pool.query('SELECT * FROM comenzi WHERE id_comanda=$1', [id_comanda]);
    if (comanda.rows.length === 0) {
      return res.status(400).json({ error: 'Comanda nu exista' });
    }

    const facturaExistenta = await pool.query('SELECT * FROM facturi WHERE id_comanda=$1', [id_comanda]);
    if (facturaExistenta.rows.length > 0) {
      return res.status(400).json({ error: 'Factura pentru aceasta comanda exista deja' });
    }

    const total = comanda.rows[0].total;
    const tva = parseFloat((total * 0.19).toFixed(2));

    const result = await pool.query(
      `INSERT INTO facturi
       (id_comanda, data_scadenta, total_facturat, tva_total, modalitate_plata, status_plata, observatii)
       VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
      [id_comanda, data_scadenta || null, total, tva, modalitate_plata || null, status_plata || null, observatii || null]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { modalitate_plata, status_plata, observatii } = req.body;

  try {
    const result = await pool.query(
      `UPDATE facturi SET modalitate_plata=$1, status_plata=$2, observatii=$3 WHERE id_factura=$4 RETURNING *`,
      [modalitate_plata || null, status_plata || null, observatii || null, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Factura nu exista' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM facturi WHERE id_factura=$1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Factura nu exista' });
    }
    res.json({ message: 'Factura stearsa cu succes' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
