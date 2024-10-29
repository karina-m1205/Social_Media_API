const User = require("../models/users.js");

const blockUser = async (userId, blockUserId) => {
    const foundUser = await User.findById(userId);
    if (!foundUser) {
        throw new Error("user not found");
    };
    if (!foundUser.blocks.includes(blockUserId)) {
        foundUser.blocks.push(blockUserId);
        await foundUser.save();
    };
    return { blockedUser: blockUserId };
};

const unblockUser = async (userId, unblockUserId) => {
    const foundUser = await User.findById(userId);
    if (!foundUser) {
        throw new Error("user not found");
    };

    if (foundUser.blocks.includes(unblockUserId)) {
        foundUser.blocks = foundUser.blocks.filter(blockUser => blockUser.toString() !== unblockUserId);
        await foundUser.save();
    };
    return { unblockedUser: unblockUserId };
};

const getAllBlockedUser = async (userId1, userId2) => {
    if (userId1 !== userId2) {
        throw new Error("not authorized to view the blocks list");
    };
    const foundUser = await User.findById(userId2).populate("following", "username");
    if (!foundUser) {
        throw new Error("user not found");
    };
    return { blocks: foundUser.blocks };
};

module.exports = {
    blockUser,
    unblockUser,
    getAllBlockedUser,
}