const mongoose = require("mongoose");
const tokenId = require("../helpers/tokenId")

const veterinariosSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  telefono: {
    type: Number,
    default: null,
    trim: true,
  },
  web: {
    type: String,
    default: null,
  },
  token: {
    type: String,
    default: tokenId()
  },
  confirmado: {
    type: Boolean,
    default: false,
  },
});


const Veterinario = mongoose.model("Veterinario", veterinariosSchema)

module.exports = Veterinario;