import jwt from 'jsonwebtoken'
const JWT_SECRETKEY = process.env.JWT_SECRETKEY

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.token
        if (!token) return res.json({ msg: 'no token found' })

        const decoded = jwt.verify(token, JWT_SECRETKEY)
        req.user = decoded
        next()
    } catch (err) {
        return res.json({ msg: err })
    }

}

export default authMiddleware