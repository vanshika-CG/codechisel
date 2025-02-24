const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" }, // Link note to user
  title: { type: String, required: true },
  content: { type: String, required: true },
  color: { type: String, default: '#ffffcc' },
}, { timestamps: true });

module.exports = mongoose.model('Note', NoteSchema);
