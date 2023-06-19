const User = require('../models/users.model');
const jwt_decode = require('jwt-decode');
const jwt = require('jsonwebtoken');

class UsersController {
    async register(req, res) {
        try {
            const { nama, login_number, token, testss } = req.body
            const duplicate = await User.findOne({ login_number: login_number })
            if (duplicate) {
                res.status(400).json({ message: "Pin telah terpakai!" })
            } else {
                const user = User.insertMany(req.body).then((result) => {
                    res.status(200).json({ result })
                })
            }
        } catch (error) {
            res.status(400).send()
        }
    }

    async login(req, res) {
        try {
            const { login_number } = req.body
            const userId = await User.findOne({ login_number: login_number })
            const userIdString = userId._id.toString();

            const jwt_key = '123qwe890'
            const token = jwt.sign({ _id: userIdString }, jwt_key)
            const tokenUser = await User.updateOne({ _id: userIdString }, { $set: { token: token } }).then(() => {
                res.status(200).send({ userId, token })
            })
        } catch (error) {
            res.status(400).send()
        }
    }

    async getDataUser(req, res) {
        try {
            const code = req.header('code');
            const decoded = jwt_decode(code);

            const user = await User.find({ _id: decoded._id })
            res.status(200).send({ user })
        } catch (error) {

        }
    }

    async deleteUser(req, res) {
        try {
            const code = req.header('code');
            const decoded = jwt_decode(code);

            const user = await User.deleteOne({ _id: decoded._id })
            res.status(200).send({ user })
        } catch (error) {
            res.status(400).send()
        }
    }
}

module.exports = { UsersController }