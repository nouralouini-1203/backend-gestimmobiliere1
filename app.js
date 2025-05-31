const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const http = require('http');

const app = express();

dotenv.config();

const server = http.createServer(app);

// Importer les routes (routers)
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/usersRouter');
const osRouter = require('./routes/osRouter');
const apartmentRouter = require('./routes/apartmentRouter');
const messageRouter = require('./routes/messageRouter');
const paiementRouter = require('./routes/paiementRouter');
const proprieteRouter = require('./routes/proprieteRouter');
const reservationRouter = require('./routes/reservationRouter');
const notificationRouter = require('./routes/notificationRouter');
const authentificationRouter = require('./routes/authRouter');  // corrigé

// Middlewares
app.use(cors());
app.use(express.json());

// Connexion base de données
require('./config/db');

// Routes (avec slash /)
app.use('/users', usersRouter);
app.use('/index', indexRouter);
app.use('/os', osRouter);
app.use('/apartments', apartmentRouter);
app.use('/message', messageRouter);
app.use('/paiement', paiementRouter);
app.use('/propriete', proprieteRouter);
app.use('/reservation', reservationRouter);
app.use('/notification', notificationRouter);
app.use('/authentification', authentificationRouter);

// Exporte uniquement app et server (plus de io)
module.exports = { app, server };

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});