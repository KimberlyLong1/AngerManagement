const jwt = require("jsonwebtoken")
const { models } = require("../model")

const validateJWT = async (req, res, next) => {
    try{

        if (req.method == "OPTIONS") {
            next();
        } else if (
            req.headers.authorization &&
            req.headers.authorization.includes('Bearer')

            ) {
                const { authorization } = req.headers;
                // console.log("Authorization", authorization);
                const payload = authorization ? jwt.verify(
            authorization.includes("Bearer")
                ? authorization.split(" ")[1]
                : authorization,
                process.env.JWT_SECRET
        ) : undefined;
        
        // console.log("Payload:", payload);

        if (payload) {
            let foundUser = await models.UserModel.findOne({ where: { id: payload.id } });
            
            // console.log("Found user:", foundUser);
            
            if (foundUser) {
                // console.log("Request:", req);
                req.user = foundUser;
                next();
            } else {
                res.status(400).send({ message: "Not authorized" })
            }
        } else {
            res.status(401).send({ message: "Invalid token" })
        }
    } else {
        res.status(403).send({ message: "Forbidden" })
    }
}catch(err){
    res.status(500).send({ error: err })

}
}

module.exports = validateJWT;