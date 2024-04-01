const mongoose = require("mongoose");

const pacientesSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  propietario: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  fecha: {
    type: Date,
    required: true,
  },
  sintomas: {
    type: String,
    required: true
  },
  veterinario:{
    type:mongoose.Schema.Types.ObjectId,
    ref: "Veterinario"
  }
},
{
    timestamps:true,
});

const Paciente = mongoose.model("Paciente", pacientesSchema)

module.exports = Paciente;