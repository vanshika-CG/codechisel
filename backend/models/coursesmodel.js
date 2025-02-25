const { getDB } = require('../config/db');

// Access the courses collection
const coursesCollection = () => getDB().collection('courses');

module.exports = coursesCollection;
    