const mongoose = require('mongoose');

const apartmentSchema = new mongoose.Schema({
location: { type: String, required: true },
price: { type: Number, required: true },
floor: { type: Number, required: true },
area: { type: Number, required: true }, // superficie -> area
numberOfRooms: { type: Number, required: true }, // nombreDeChambres -> numberOfRooms
residenceName: { type: String }, // nomResidence -> residenceName
elevator: { type: Boolean, default: false }, // ascenseur -> elevator
parking: { type: Boolean, default: false },
available: { type: Boolean, default: true }, // disponible -> available
owner : {type:mongoose.Schema.Types.ObjectId,ref:'user',}
});

const Apartment = mongoose.model('Apartment', apartmentSchema);

module.exports = Apartment;
