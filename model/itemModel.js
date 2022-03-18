const { DataTypes } = require("sequelize")
const db = require("../db")

// table headings and type of date
const ItemModel = db.define("item", {
  name: {
    type: DataTypes.STRING(150),
    allowNull: false
},
  time: {
    type: DataTypes.STRING(50),
    allowNull: false
},
  price: {
    type: DataTypes.STRING(50),
    allowNull: false
},
  numberOfPeople: {
    type: DataTypes.STRING(150),
    allowNull: false
},
  description: {
    type: DataTypes.STRING(350),
    allowNull: false
},
  image: {
    type: DataTypes.STRING(50),
    allowNull: false
},
  packageCode: {
    type: DataTypes.STRING(50),
    allowNull: false
}, 
})

module.exports = ItemModel
