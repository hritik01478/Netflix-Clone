const router = require('express').Router();
const User = require('../models/User.js');
const CryptoJS = require('crypto-js');
const verify = require('../verifyToken.js')

// UPDATE
router.put('/:id', verify, async (req, res) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
        if (req.body.password) {
            req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString()
        }

        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
            res.status(201).json(updatedUser)
        }
        catch (err) {
            res.status(500).json(err)
        }
    }
    else {
        res.status(403).json("You can update only your account")
    }
})

// DELETE

// GET USER

//GET ALL USER

// GET USER STATS

module.exports = router;