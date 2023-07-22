// database.js

const { Sequelize } = require('sequelize');

// Replace the placeholders with your actual database configuration
const sequelize = new Sequelize('newdb', 'root', '', {
    host: 'localhost', // Replace with your actual database host if it's not running locally
    dialect: 'mysql',
});

// Test the database connection
async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

testConnection();

module.exports = sequelize;
