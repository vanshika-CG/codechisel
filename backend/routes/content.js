const express = require('express');
const contentCollection = require('../models/contentmodel');
const { ObjectId } = require('mongodb');
const {
    updateContentById,
    deleteContentById,
    createContent,
    getContentById,
    getAllContent
} = require('../models/contentmodel');


const router = express.Router();

// POST: Create new content
router.post('/', async (req, res) => {
    try {
        const { title, body, author } = req.body;

        // Validation
        if (!title || !body || !author) {
            return res.status(400).send("Title, body, and author are required");
        }

        const content = {
            title,
            body,
            author,
            createdAt: new Date(),
            updatedAt: new Date(),
            status: "draft",  // default status could be 'draft'
        };

        const result = await createContent(content);
        res.status(201).json({ message: "Content created", contentId: result.insertedId });
    } catch (err) {
        res.status(500).send("Error creating content: " + err.message);
    }
});

// GET: Fetch all content
router.get('/', async (req, res) => {
    try {
        const contents = await getAllContent();
        res.status(200).json(contents);
    } catch (err) {
        res.status(500).send("Error fetching content: " + err.message);
    }
});

// GET: Fetch content by ID

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;

        // Validate ID
        if (!ObjectId.isValid(id)) {
            return res.status(400).send("Invalid content ID");
        }

        // Fetch content from the database using getContentById
        const content = await getContentById(id);

        if (!content) {
            return res.status(404).send("Content not found");
        }

        res.status(200).json(content);
    } catch (err) {
        console.error("Error fetching content:", err.message);
        res.status(500).send("Error fetching content: " + err.message);
    }
});

// PUT: Update content by ID
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, body, author, status } = req.body;

        if (!ObjectId.isValid(id)) {
            return res.status(400).send("Invalid content ID");
        }

        const updatedData = { title, body, author, status, updatedAt: new Date() };
        const result = await updateContentById(id, updatedData);

        if (result.matchedCount === 0) {
            return res.status(404).send("Content not found");
        }

        res.status(200).send("Content updated successfully");
    } catch (err) {
        res.status(500).send("Error updating content: " + err.message);
    }
});

// DELETE: Delete content by ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
            return res.status(400).send("Invalid content ID");
        }

        const result = await deleteContentById(id);

        if (result.deletedCount === 0) {
            return res.status(404).send("Content not found");
        }

        res.status(200).send("Content deleted successfully");
    } catch (err) {
        res.status(500).send("Error deleting content: " + err.message);
    }
});

module.exports = router;
