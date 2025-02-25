const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { getDB } = require('../config/db');
const { ObjectId } = require('mongodb');
const authMiddleware = require('../middleware/auth'); // ✅ Fixed import
const Note = require('../models/Note'); 

// POST: Create a new note
router.post('/', authMiddleware, async (req, res) => {
  try {
      const { title, content, color } = req.body;
      const newNote = new Note({
          title,
          content,
          color,
          user: req.user.id 
      });

      const savedNote = await newNote.save();
      res.json(savedNote);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error creating note", error: error.message });
  }
});

// GET: Fetch all notes (🔹 Added `authMiddleware`)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const db = getDB();
    const notes = await db.collection('notes').find({ userId }).toArray();
    
    res.status(200).json(notes);
  } catch (error) {
    console.error('❌ Error fetching notes:', error);
    res.status(500).json({ message: 'Error fetching notes', error: error.message });
  }
});

// DELETE: Delete a note by ID (🔹 Added `authMiddleware`)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid note ID format' });
    }

    const db = getDB();
    const note = await db.collection('notes').findOne({ _id: new ObjectId(id), userId });

    if (!note) {
      return res.status(404).json({ message: 'Note not found or unauthorized' });
    }

    await db.collection('notes').deleteOne({ _id: new ObjectId(id) });
    res.status(200).json({ message: 'Note deleted successfully' });
  } catch (error) {
    console.error('❌ Error deleting note:', error);
    res.status(500).json({ message: 'Error deleting note', error: error.message });
  }
});

// PUT: Update a note by ID (🔹 Added `authMiddleware`)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, color } = req.body;
    const userId = req.user.id;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid note ID format' });
    }

    const db = getDB();
    const note = await db.collection('notes').findOne({ _id: new ObjectId(id), userId });

    if (!note) {
      return res.status(404).json({ message: 'Note not found or unauthorized' });
    }

    await db.collection('notes').updateOne(
      { _id: new ObjectId(id) },
      { $set: { title, content, color } }
    );

    const updatedNote = await db.collection('notes').findOne({ _id: new ObjectId(id) });
    res.status(200).json(updatedNote);
  } catch (error) {
    console.error('❌ Error updating note:', error);
    res.status(500).json({ message: 'Error updating note', error: error.message });
  }
});

module.exports = router;
