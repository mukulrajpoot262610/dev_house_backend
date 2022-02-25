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
}

module.exports = new RoomService()