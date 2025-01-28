const { getDB } = require('../config/db');
const { ObjectId } = require('mongodb');


// Access the content collection
const contentCollection = () => getDB().collection('content');

// CRUD operations

// Create new content
const createContent = async (content) => await contentCollection().insertOne(content);

// Get content by ID
const getContentById = async (id) => await contentCollection().findOne({ _id: new ObjectId(id) });

// Get all content (or filter based on status, etc.)
const getAllContent = async () => await contentCollection().find().toArray();

// Update content by ID
const updateContentById = async (id, updatedData) => {
    const db = getDB();
    return await db.collection('content').updateOne(
        { _id: new ObjectId(id) }, // Query by ObjectId
        { $set: updatedData }      // Update with new data
    );
};

// Helper function to delete content by ID
const deleteContentById = async (id) => {
    const db = getDB();
    return await db.collection('content').deleteOne(
        { _id: new ObjectId(id) } // Query by ObjectId
    );
};


module.exports = {
    contentCollection,
    createContent,
    getContentById,
    getAllContent,
    updateContentById,
    deleteContentById
};
