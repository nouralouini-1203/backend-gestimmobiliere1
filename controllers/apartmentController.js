const mongoose = require('mongoose');
const Apartment = require('../models/apartmentSchema');
const User = require('../models/userModel');

module.exports.getALLapartments = async (req, res) => {
    try {
        const listapartment = await Apartment.find();
        res.status(200).json({ Listapartments: listapartment });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.getApartmentById = async (req, res) => {
    try {
        const { id } = req.params;
        const apartment = await Apartment.findById(id);
        if(!apartment) {
            return res.status(404).json({ message: "Apartment not found" });
        }
        res.status(200).json({ apartment });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.addApartment = async (req, res) => {
    try {
        const { location, price, floor, area, numberOfRooms, residenceName, elevator, parking, available } = req.body;
        const addedApartment = new Apartment({
            location, price, floor, area, numberOfRooms, residenceName, elevator, parking, available
        });

        await addedApartment.save();

        res.status(201).json({ message: "Apartment added successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.deleteApartment = async (req, res) => {
    try {
        const { id } = req.params;
        const apartment = await Apartment.findById(id);

        if (!apartment) {
            return res.status(404).json({ message: "Apartment not found" });
        }

        // Retirer l'appartement des utilisateurs
        await User.updateMany({}, { $pull: { apartments: apartment._id } });

        // Supprimer l'appartement
        await Apartment.findByIdAndDelete(id);

        res.status(200).json({ message: "Apartment deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.addApartmentWithOwner = async (req, res) => {
    try {
        const { location, price, floor, area, numberOfRooms, residenceName, elevator, parking, available, owner } = req.body;

        const addedApartment = new Apartment({
            location, price, floor, area, numberOfRooms, residenceName, elevator, parking, available, owner
        });

        await addedApartment.save();

        // Ajout de l'appartement au propriétaire
        await User.findByIdAndUpdate(owner, {
            $push: { apartments: addedApartment._id }
        });

        res.status(201).json({ message: "Apartment added successfully with owner." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// FONCTION AVEC NOM CORRECT EN CAMELCASE
module.exports.updateApartmentById = async (req, res) => {
    try {
        const { id } = req.params;
        const { location, price, floor, area, numberOfRooms, residenceName, elevator, parking, available } = req.body;

        const apartment = await Apartment.findById(id);
        if (!apartment) {
            return res.status(404).json({ message: "Apartment not found" });
        }

        await Apartment.findByIdAndUpdate(id, {
            $set: {
                location,
                price,
                floor,
                area,
                numberOfRooms,
                residenceName,
                elevator,
                parking,
                available
            }
        });

        res.status(200).json({ message: "Apartment updated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.getCountApartment = async (req, res) => {
    try {
        const count = await Apartment.countDocuments();
        res.status(200).json({ count });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.getApartmentOwner = async (req, res) => {
    try {
        const apartments = await Apartment.find().populate('owner', 'nom prenom email');
        res.status(200).json({ apartments });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
