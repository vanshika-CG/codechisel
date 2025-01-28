const { getDB } = require('../config/db');

// Users Collection Accessor
const usersCollection = () => getDB().collection('users');

module.exports = {
    usersCollection
};
