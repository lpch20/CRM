const mongoose = require("mongoose");
const tokenId = require("../helpers/tokenId")
const bcrypt = require("bcrypt");

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


veterinariosSchema.pre('save', async function (next) {
  if(!this.isModified("password")){
    next();
  }

  const salt = await bcrypt.genSalt(10);

  this.password  = await bcrypt.hash(this.password, salt);
})

veterinariosSchema.methods.comprobarPassword = async function (passwordFormulario) {
  return await bcrypt.compare(passwordFormulario, this.password)
}

const Veterinario = mongoose.model("Veterinario", veterinariosSchema)

module.exports = Veterinario;