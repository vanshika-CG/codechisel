const { getDB } = require('../config/db');

// Access the users collection
const usersCollection = () => getDB().collection('users');

module.exports = usersCollection;
