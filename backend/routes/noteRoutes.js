const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { getDB } = require('../config/db');
const { ObjectId } = require('mongodb');

// POST: Create a new note
router.post('/', async (req, res) => {
  try {
    const { title, content, color } = req.body;
    if (!title || !content || !color) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const db = getDB();
    const result = await db.collection('notes').insertOne({ title, content, color });

    res.status(201).json({ 
      _id: result.insertedId, // Return correct _id
      title, 
      content, 
      color 
    });
  } catch (error) {
    console.error('❌ Error creating note:', error);
    res.status(500).json({ message: 'Error creating note', error: error.message });
  }
});

// GET: Fetch all notes
router.get('/', async (req, res) => {
  try {
    const db = getDB();
    const notes = await db.collection('notes').find().toArray();
    res.status(200).json(notes);
  } catch (error) {
    console.error('❌ Error fetching notes:', error);
    res.status(500).json({ message: 'Error fetching notes', error: error.message });
  }
});

// DELETE: Delete a note by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid note ID format' });
    }

    const db = getDB();
    const result = await db.collection('notes').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.status(200).json({ message: 'Note deleted successfully' });
  } catch (error) {
    console.error('❌ Error deleting note:', error);
    res.status(500).json({ message: 'Error deleting note', error: error.message });
  }
});

// PUT: Update a note by ID
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, color } = req.body;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid note ID format' });
    }

    const db = getDB();
    const noteId = new ObjectId(id);
    const result = await db.collection('notes').updateOne(
      { _id: noteId },
      { $set: { title, content, color } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Note not found' });
    }

    const updatedNote = await db.collection('notes').findOne({ _id: noteId });
    res.status(200).json(updatedNote);
  } catch (error) {
    console.error('❌ Error updating note:', error);
    res.status(500).json({ message: 'Error updating note', error: error.message });
  }
});

module.exports = router;
