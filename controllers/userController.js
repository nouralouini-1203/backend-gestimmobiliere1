const User = require('../models/userModel');
const bcrypt = require('bcrypt');

// Récupérer tous les utilisateurs (sans mot de passe)
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Récupérer un utilisateur par id
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mettre à jour un utilisateur
exports.updateUser = async (req, res) => {
  try {
    const { nom, prenom, email, role, age, user_image, isActive } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });

    // Mise à jour des champs autorisés
    user.nom = nom ?? user.nom;
    user.prenom = prenom ?? user.prenom;
    user.email = email ?? user.email;
    user.role = role ?? user.role;
    user.age = age ?? user.age;
    user.user_image = user_image ?? user.user_image;
    user.isActive = isActive ?? user.isActive;

    await user.save();
    res.status(200).json({ message: 'Utilisateur mis à jour avec succès', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mettre à jour le mot de passe d'un utilisateur
exports.updatePassword = async (req, res) => {
  try {
    const { password } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();
    res.status(200).json({ message: 'Mot de passe mis à jour avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Supprimer un utilisateur
exports.deleteUserById = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });
    res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Ajouter un utilisateur avec image
exports.addUserWithImage = async (req, res) => {
  try {
    const { nom, prenom, email, password, role, age, isActive } = req.body;
    const user_image = req.file ? req.file.path : null; // chemin de l'image uploadée

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email déjà utilisé' });
    }

    // Hachage du mot de passe
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      nom,
      prenom,
      email,
      password: hashedPassword,
      role,
      age,
      isActive,
      user_image
    });

    await newUser.save();
    res.status(201).json({ message: 'Utilisateur créé avec image', user: newUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Ajouter un client
exports.addClient = async (req, res) => {
  try {
    const { nom, prenom, email, password, age } = req.body;

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email déjà utilisé' });
    }

    // Hachage du mot de passe
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newClient = new User({
      nom,
      prenom,
      email,
      password: hashedPassword,
      role: 'client', // rôle client fixé
      age,
      isActive: true  // active par défaut (à adapter selon ton besoin)
    });

    await newClient.save();
    res.status(201).json({ message: 'Client ajouté avec succès', user: newClient });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Ajouter un administrateur (à compléter si besoin)
exports.addAdmin = async (req, res) => {
  // TODO : Implémenter la création d'un administrateur si nécessaire
  res.status(501).json({ message: 'Fonction addAdmin non encore implémentée' });
};
