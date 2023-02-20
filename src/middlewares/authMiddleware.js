const jwt = require("jsonwebtoken");
const { UserAuth } = require("../context/AuthContext");
const { accessToken } = UserAuth();

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        console.log('token in authMiddleWares: ', token)
        if (!token) {
            return res.status(401).send({
                message: "Auth false",
                success: false
            })
        }
        const decode = jwt.verify(token, process.env.jwt_secret);
        req.body.userId = decode.userId;
        next();
    } catch (error) {
        return res.status(401).send({
            success: false,
            message: "Auth false"
        })
    }
}