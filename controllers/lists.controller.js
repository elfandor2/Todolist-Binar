const List = require('../models/lists.model');
const jwt_decode = require('jwt-decode');
const jwt = require('jsonwebtoken');

class ListsController {
    async postLists(req, res) {
        try {
            const code = req.header('code');
            const decoded = jwt_decode(code);
            const newList = {
                name: req.body.name,
                user: decoded._id
            }
            const lists = new List(newList)
            await lists.save()
            res.status(201).json(lists)
        } catch (error) {
            res.status(500).send(error.message)
        }
    }

    async getLists(req, res) {
        try {
            const code = req.header('code');
            const decoded = jwt_decode(code);

            const lists = await List.find({ user: decoded._id })
            res.status(200).json(lists)
        } catch (error) {
            res.status(400).send()
        }
    }

    async completeList(req, res) {
        try {
            const idList = req.params.id
            const code = req.header('code');
            const decoded = jwt_decode(code);

            const completedLists = await List.updateOne({ _id: idList, user: decoded._id }, { $set: { isCompleted: true } })

            const lists = await List.find({ _id: idList, user: decoded._id })

            res.status(200).json(lists)
        } catch (error) {
            res.status(400).send()
        }
    }

    async deleteList(req, res) {
        try {
            const idList = req.params.id
            const code = req.header('code');
            const decoded = jwt_decode(code);

            const deletedLists = await List.deleteOne({ _id: idList, user: decoded._id }, { $set: { isCompleted: true } })

            const lists = await List.find({ _id: idList, user: decoded._id })

            res.status(200).json(deletedLists)
        } catch (error) {
            res.status(400).send()
        }
    }
}

module.exports = { ListsController }