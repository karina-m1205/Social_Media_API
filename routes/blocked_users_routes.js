const express = require("express");
const router = express.Router();
const blocks_service = require("../services/blocks_service.js");
const authMiddleware = require("../middleware/auth_middleware.js");

router.post("/:userId/block", authMiddleware, async (req, res) => {
    try {
        const userId = req.user;
        const blockUserId = req.params.userId;
        const result = await blocks_service.blockUser(userId, blockUserId);
        res.status(200).json({ message: result });
    } catch (error) {
        res.status(500).json({ message: error.message });
    };
});

router.delete("/:userId/unblock", authMiddleware, async (req, res) => {
    try {
        const userId = req.user;
        const unblockUserId = req.params.userId;
        const result = await blocks_service.unblockUser(userId, unblockUserId);
        res.status(200).json({ message: result });
    } catch (error) {
        res.status(500).json({ message: error.message });
    };
});

router.get("/:userId/blocked", authMiddleware, async (req, res) => {
    try {
        const userId1 = req.user;
        const userId2 = req.params.userId;
        const result = await blocks_service.getAllBlockedUser(userId1,userId2);
        res.status(200).json({ message: result });
    } catch (error) {
        res.status(500).json({ message: error.message });
    };
});


module.exports = router;