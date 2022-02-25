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

}

module.exports = new RoomsController()