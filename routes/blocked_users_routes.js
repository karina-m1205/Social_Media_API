const express = require("express");
const router = express.Router();
const blocks_service = require("../services/blocks_service.js");
const authMiddleware = require("../middleware/auth_middleware.js");

router.post("/:userId/block", authMiddleware, async (req, res) => {
    try {
        const userId = req.params.userId;
        const blockUserId = req.query.blockUserId;
        const result = await blocks_service.blockUser(userId, blockUserId);
        res.status(200).json({ message: result });
    } catch (error) {
        res.status(500).json({ message: error.message });
    };
});

router.delete("/:userId/unblock", authMiddleware, async (req, res) => {
    try {
        const userId = req.params.userId;
        const unblockUserId = req.query.unblockUserId;
        const result = await blocks_service.unblockUser(userId, unblockUserId);
        res.status(200).json({ message: result });
    } catch (error) {
        res.status(500).json({ message: error.message });
    };
});

router.get("/:userId/blocked", authMiddleware, async (req, res) => {
    try {
        const userId = req.params.userId;
        const result = await blocks_service.getAllBlockedUser(userId);
        res.status(200).json({ message: result });
    } catch (error) {
        res.status(500).json({ message: error.message });
    };
});


module.exports = router;