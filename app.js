require("dotenv").config();
const Express = require('express');
const app = Express();
const dbConnection = require("./db");
const controllers = require("./controllers");
const middleware = require("./middleware/validate-session");

app.use(Express.json());
app.use(require("./middleware/headers"));
app.use("/user", controllers.usercontroller);
app.use("/booking", middleware, controllers.bookingcontroller)

dbConnection.authenticate()
.then(() => dbConnection.sync( { force: true }))
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`[Server]: App is listening on ${process.env.PORT}.`);
    });
})
.catch((err) => {
    console.log(`[Server]: Server crashed. Error = ${err}`);
})
