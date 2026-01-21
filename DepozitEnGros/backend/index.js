const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());           
app.use(express.json());  

const categoriiRoutes = require('./routes/categorii');
const furnizoriRoutes = require('./routes/furnizori');
const clientiRoutes = require('./routes/clienti');
const produseRoutes = require('./routes/produse');
const comenziRoutes = require('./routes/comenzi');
const facturiRoutes = require('./routes/facturi');

app.use('/categorii', categoriiRoutes);
app.use('/furnizori', furnizoriRoutes);
app.use('/clienti', clientiRoutes);
app.use('/produse', produseRoutes);
app.use('/comenzi', comenziRoutes);
app.use('/facturi', facturiRoutes);

app.get('/', (req, res) => {
  res.send('Backend-ul rulează!');
});

app.listen(PORT, () => {
  console.log(`Server pornit pe portul ${PORT}`);
});
