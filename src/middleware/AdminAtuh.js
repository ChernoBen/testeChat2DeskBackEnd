const jwt = require("jsonwebtoken");
require('dotenv/config');
const secret = process.env.SECRET_API;

module.exports = (req, res, next) => {
    const authToken = req.headers['authorization'];
    if (authToken != undefined) {
        const bearer = authToken.split(' ');
        let token = bearer[1];
        try {

            let decoded = jwt.verify(token, secret);
            console.log(decoded);
            next();

        } catch (error) {
            return res.status(403).json({message:"Usuario não autenticado"})
        }


    } else {
        return res.status(403).json({ message: "usuario não autenticado!" })
    }
}