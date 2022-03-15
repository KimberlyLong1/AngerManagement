require("dotenv").config();
const Express = require('express');
const app = Express();
const dbConnection = require("./db");
const controllers = require("./controllers");
const validateSession = require("./middleware/validate-session");

app.use(Express.json());
app.use(require("./middleware/headers"));

const helmet= require('helmet');

app.use("/user", controllers.usercontroller);
app.use("/booking", controllers.bookingcontroller)
app.use("/item", controllers.itemscontroller)
app.use(helmet());


dbConnection.authenticate()
.then(() => dbConnection.sync( ))
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`[Server]: App is listening on ${process.env.PORT}.`);
    });
})
.catch((err) => {
    console.log(`[Server]: Server crashed. Error = ${err}`);
})
