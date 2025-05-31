const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Accès refusé' });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // contient l'ID et rôle de l'utilisateur
    next();
  } catch (err) {
    res.status(400).json({ error: 'Token invalide' });
  }
};
