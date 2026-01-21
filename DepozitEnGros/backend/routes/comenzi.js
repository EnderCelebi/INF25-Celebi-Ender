const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT co.id_comanda, cl.nume AS client, co.data_comanda, co.total
      FROM comenzi co
      LEFT JOIN clienti cl ON co.id_client = cl.id_client
      ORDER BY co.id_comanda
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  const { id_client, produse } = req.body;

  if (!id_client || !Array.isArray(produse) || produse.length === 0) {
    return res.status(400).json({ error: 'Clientul si produsele sunt obligatorii' });
  }

  try {
    const client = await pool.query(
      'SELECT id_client FROM clienti WHERE id_client=$1',
      [id_client]
    );
    if (client.rows.length === 0) {
      return res.status(400).json({ error: 'Clientul nu exista' });
    }

    await pool.query('BEGIN');

    const comanda = await pool.query(
      'INSERT INTO comenzi (id_client, total) VALUES ($1, 0) RETURNING id_comanda',
      [id_client]
    );

    const id_comanda = comanda.rows[0].id_comanda;
    let totalComanda = 0;

    for (const p of produse) {
      const produsDb = await pool.query(
        'SELECT id_produs, nume, stoc, pret_vanzare FROM produse WHERE id_produs=$1',
        [p.id_produs]
      );

      if (produsDb.rows.length === 0) {
        throw { status: 400, message: `Produsul cu id ${p.id_produs} nu exista` };
      }

      if (produsDb.rows[0].stoc < p.cantitate) {
        throw {
          status: 400,
          message: `Stoc insuficient pentru produsul ${produsDb.rows[0].nume}`
        };
      }

      const pret_unitar = produsDb.rows[0].pret_vanzare;
      totalComanda += pret_unitar * p.cantitate;

      await pool.query(
        'INSERT INTO detalii_comanda (id_comanda, id_produs, cantitate, pret_unitar) VALUES ($1,$2,$3,$4)',
        [id_comanda, p.id_produs, p.cantitate, pret_unitar]
      );

      await pool.query(
        'UPDATE produse SET stoc = stoc - $1 WHERE id_produs=$2',
        [p.cantitate, p.id_produs]
      );
    }

    await pool.query(
      'UPDATE comenzi SET total=$1 WHERE id_comanda=$2',
      [totalComanda, id_comanda]
    );

    await pool.query('COMMIT');
    res.status(201).json({ id_comanda, total: totalComanda });

  } catch (err) {
    await pool.query('ROLLBACK');
    res.status(err.status || 500).json({ error: err.message || err });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const comanda = await pool.query(
      'SELECT * FROM comenzi WHERE id_comanda=$1',
      [id]
    );

    if (comanda.rows.length === 0) {
      return res.status(404).json({ error: 'Comanda nu exista' });
    }

    const detalii = await pool.query(`
      SELECT dc.id_detaliu, p.nume, dc.cantitate, dc.pret_unitar
      FROM detalii_comanda dc
      LEFT JOIN produse p ON dc.id_produs = p.id_produs
      WHERE dc.id_comanda=$1
    `, [id]);

    res.json({
      comanda: comanda.rows[0],
      produse: detalii.rows
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query('BEGIN');

    const comanda = await pool.query(
      'SELECT * FROM comenzi WHERE id_comanda=$1',
      [id]
    );
    if (comanda.rows.length === 0) {
      await pool.query('ROLLBACK');
      return res.status(404).json({ error: 'Comanda nu exista' });
    }

    const detalii = await pool.query(
      'SELECT id_produs, cantitate FROM detalii_comanda WHERE id_comanda=$1',
      [id]
    );

    for (const d of detalii.rows) {
      await pool.query(
        'UPDATE produse SET stoc = stoc + $1 WHERE id_produs=$2',
        [d.cantitate, d.id_produs]
      );
    }

    await pool.query(
      'DELETE FROM detalii_comanda WHERE id_comanda=$1',
      [id]
    );

    await pool.query(
      'DELETE FROM comenzi WHERE id_comanda=$1',
      [id]
    );

    await pool.query('COMMIT');
    res.json({ message: 'Comanda stearsa cu succes' });

  } catch (err) {
    await pool.query('ROLLBACK');
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
