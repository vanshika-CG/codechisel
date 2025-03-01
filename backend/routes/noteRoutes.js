const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const Note = require('../models/Note');

// POST: Create a new note
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required" });
    }

    const newNote = new Note({
      userId: req.user._id,
      title,
      content,
    });

    await newNote.save();
    res.status(201).json(newNote);
  } catch (error) {
    console.error("Error saving note:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// Get all notes for logged-in user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user._id }); // Fetch only user's notes
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});


// PUT: Update a note (Ensure only the owner can update)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, color } = req.body;

    const updatedNote = await Note.findOneAndUpdate(
      { _id: id, userId: req.user._id }, // Ensure user owns the note
      { title, content, color },
      { new: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ message: 'Note not found or unauthorized' });
    }

    res.status(200).json(updatedNote);
  } catch (error) {
    console.error('❌ Error updating note:', error);
    res.status(500).json({ message: 'Error updating note', error: error.message });
  }
});

// DELETE: Remove a note (Ensure only the owner can delete)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const deletedNote = await Note.findOneAndDelete({ _id: req.params.id, userId: req.user._id });

    if (!deletedNote) {
      return res.status(404).json({ message: 'Note not found or unauthorized' });
    }

    res.status(200).json({ message: 'Note deleted successfully' });
  } catch (error) {
    console.error('❌ Error deleting note:', error);
    res.status(500).json({ message: 'Error deleting note', error: error.message });
  }
});

module.exports = router;
