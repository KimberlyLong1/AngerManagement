const { DataTypes } = require("sequelize")
const db = require("../db")

const User = db.define("user", {
    firstName: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(),
        allowNull: false,
    },
    admin: {
        type: DataTypes.STRING(10),
        allowNull: false,
    }
})

module.exports = User