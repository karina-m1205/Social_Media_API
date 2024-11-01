const express = require("express");
const router = express.Router();
const follow_service = require("../services/follows_service.js");
const authMiddleware = require("../middleware/auth_middleware.js");

router.post("/:userId/follow",authMiddleware, async (req, res) => {
    try {
        const userId = req.user;
        const followUserId = req.params.userId;
        const result = await follow_service.follow(userId, followUserId);
        res.status(200).json({ message: result });
    } catch (error) {
        res.status(500).json({ message: error.message });
    };
});

router.delete("/:userId/unfollow",authMiddleware, async (req, res) => {
    try {
        const userId = req.user;
        const followUserId = req.params.userId;
        const result = await follow_service.unfollow(userId, followUserId);
        res.status(200).json({ message: result });
    } catch (error) {
        res.status(500).json({ message: error.message });
    };
});

router.get("/:userId/followers",authMiddleware, async (req, res) => {
    try {
        const userId1 = req.user;
        const userId2 = req.params.userId;
        const result = await follow_service.getAllFollowers(userId1,userId2);
        res.status(200).json({ message: result });
    } catch (error) {
        res.status(500).json({ message: error.message });
    };
});

router.get("/:userId/following",authMiddleware, async (req, res) => {
    try {
        const userId1 = req.user;
        const userId2 = req.params.userId;
        const result = await follow_service.getAllfollowings(userId);
        res.status(200).json({ message: result });
    } catch (error) {
        res.status(500).json({ message: error.message });
    };
});

module.exports = router;