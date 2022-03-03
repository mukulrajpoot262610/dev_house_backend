const roomModal = require('../models/room-modal')

class RoomService {
    async create(payload) {

        const { topic, type, ownerId } = payload

        try {

            const room = await roomModal.create({
                topic,
                type,
                ownerId,
                speakers: [ownerId]
            })

            return room

        } catch (err) {
            return err
        }
    }

    async getAllRooms(types) {
        try {
            const rooms = await roomModal.find({ type: { $in: types } }).populate('speakers').populate('ownerId').exec()
            return rooms
        } catch (err) {
            console.log(err)
            return err
        }
    }
}

module.exports = new RoomService()