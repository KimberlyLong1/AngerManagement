// const sequelize = new Sequelize(process.env.DATABASE_URL || `postgresql://postgres:${encodeURIComponent(process.env.PASS)}@localhost:5432/AngerManagement`, {
//     dialect: 'postgres',
//     ssl: process.env.ENVIRONMENT === 'production'
// })

const { Sequelize } = require("sequelize");
const db = new Sequelize(process.env.DB_CONNECTION_STRING);


module.exports=db;
