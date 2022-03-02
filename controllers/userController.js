const router = require("express").Router()
const { UserModel, models } = require("../model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { UniqueConstraintError } = require('sequelize/lib/errors');
//const model = require("../model");

router.post("/signup", async (req, res) => {
    const { firstName, lastName, email, password } = req.body

    try {
        const newUser = await UserModel.create({
            firstName,
            lastName,
            email,
            password: bcrypt.hashSync(password, 10),
        })
        
        const token = jwt.sign(
            { id: newUser.id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: 60 * 60 * 24 }
        );

        res.status(201).json({
            message: "User created",
            user: newUser,
            sessionToken: 'Bearer ${token}'
        });

    } catch(err) {
        if (err.name === UniqueConstraintError) {
            res.status(409).json({
                message: `Register Conflict`,
            });

        } else {
            res.status(500).json({
                message: `Internal Server Error`,
                error:'Failed to register user: ${err}'
            });
        };
    };
});
//setting up associations with Data Tables, associated users with bookings, maybe go under login?
router.get('userinfo', async (req, res) => {
    try {
        await models. UserModel.findAll({
            include: [
                {
                    model: model.BookingModel
                }
            ]
        })
        .then(
            user => {
                res.status(200).json({
                    user: user
                });
            }
        )
    } catch (err) {
        res.status(500).json({
            error: `Failed to retrieve user: ${err}`
        });
    };
});

// Log in
router.post("/login", async (req, res) => {
    
    let { email, password } = req.body
    try {
        const loginUser = await UserModel.findOne({
            where: { email }
        })

        if (loginUser) {
            let pwdCompare = await bcrypt.compare(password, loginUser.password)

            if (pwdCompare) {
                let token = jwt.sign(
                    { id: loginUser.id },
                    process.env.JWT_SECRET_KEY,
                    { expiresIn: 60 * 60 * 24}
                );

                res.status(200).json({
                    message: `User logged in`,
                    user: loginUser,
                    token: token
                });
            };
        } else {
            res.status(401).json({
                messsage: `Incorrect Email or Password`
            });
        };

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: err
        });
    };
});
module.exports=router;