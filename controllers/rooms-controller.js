const roomService = require("../services/room-service");

class RoomsController {
    async create(req, res) {
        const { topic, type } = req.body;

        if (!topic || !type) {
            res.status(400).json({ msg: 'All Field are required' })
        }

        const room = await roomService.create({
            topic,
            type,
            ownerId: req.user._id
        })

        return res.status(200).json({ room })

    }

    async index(req, res) {
        try {
            const rooms = await roomService.getAllRooms(['open'])
            return res.json({ rooms })
        } catch (err) {
            res.status(500).json({ msg: "Internal Server Error" })
        }
    }

}

module.exports = new RoomsController()