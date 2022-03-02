const db = require('../db');
const BookingModel = require("./booking");
const UserModel = require("./user");

UserModel.hasMany(BookingModel);

BookingModel.belongsTo(UserModel);


module.exports = { 
    dbConnection: db,
    models: {
        BookingModel, 
        UserModel,
        }
    };
