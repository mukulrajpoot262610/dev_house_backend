const userService = require('../services/user-service');

class activateController {
    async activate(req, res) {
        const { name, image, gender } = req.body;

        if (!name || !image || !gender) {
            res.status(400).json({ msg: 'All Field are required' })

        }

        const userId = req.user._id

        try {
            const user = await userService.findUser({ _id: userId })

            if (!user) {
                res.status(404).json({ msg: "User not found" })
            }

            user.activated = true;
            user.name = name;
            user.gender = gender
            user.image = image
            user.save()
            res.status(200).json({ user })
        } catch (err) {
            console.log(err)
            res.status(500).json({ msg: "Internal Server Error" })
        }

    }
}

module.exports = new activateController()