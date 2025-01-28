const { MongoClient } = require('mongodb');

// MongoDB connection details
const uri = process.env.MONGODB_URI || "mongodb+srv://test:12345@cluster0.rqg22.mongodb.net/login?retryWrites=true&w=majority";
const dbName = "login";

let db;

// Function to connect to MongoDB
const connectDB = async () => {
    try {
        const client = await MongoClient.connect(uri, { useUnifiedTopology: true });
        console.log("Connected to MongoDB");
        db = client.db(dbName); // Assign the database instance
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
        process.exit(1); // Exit the process if the connection fails
    }
};

// Function to get the database instance
const getDB = () => {
    if (!db) {
        throw new Error("Database not initialized. Call connectDB() first.");
    }
    return db;
};

module.exports = { connectDB, getDB };
