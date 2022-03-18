const { DataTypes } = require('sequelize');
const db = require('../db');

// table headings and type of date
const Booking = db.define('booking', {
    contactFirstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    contactLastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true 
    },
})

module.exports = Booking