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
    packageNumber: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    quanity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    eventDate: {
        type: DataTypes.STRING,
        allowNull: false
    },
    eventTime: {
        type: DataTypes.STRING,
        allowNull: true 
    },
    totalCost: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    owner_id: {
        type: DataTypes.INTEGER
    }
})

module.exports = Booking