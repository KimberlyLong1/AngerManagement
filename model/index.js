const db = require('../db');
const BookingModel = require("./items");
const UserModel = require("./user");
const ItemsModel = require("./itemModel")


UserModel.hasMany(BookingModel);
BookingModel.belongsTo(UserModel);
UserModel.hasMany(ItemsModel);
ItemsModel.belongsTo(UserModel);

module.exports = { 
    dbConnection: db,
    models: {
        BookingModel, 
        UserModel,
        ItemsModel,
        }
    };
