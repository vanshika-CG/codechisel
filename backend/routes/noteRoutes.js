// const express = require('express');
// const Note = require('../models');

// const router = express.Router();

// // GET all notes
// router.get('/', async (req, res) => {
//   try {
//     const notes = await Note.find();
//     res.json(notes);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching notes" });
//   }
// });

// // CREATE a new note
// router.post('/', async (req, res) => {
//   try {
//     const { title, content, color } = req.body;
//     const newNote = new Note({ title, content, color });
//     await newNote.save();
//     res.status(201).json(newNote);
//   } catch (error) {
//     res.status(500).json({ message: "Error creating note" });
//   }
// });

// // DELETE a note
// router.delete('/:id', async (req, res) => {
//   try {
//     await Note.findByIdAndDelete(req.params.id);
//     res.json({ message: "Note deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Error deleting note" });
//   }
// });

// module.exports = router;
