const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  // Otras propiedades del usuario
  // ...
  documents: [
    {
      name: { type: String, required: true },
      reference: { type: String, required: true },
    }
  ],
  last_connection: { type: Date, default: null }, // Se actualizará en cada login/logout
  isPremium: { type: Boolean, default: false },
});

module.exports = mongoose.model('User', userSchema);
