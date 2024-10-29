const User = require("../models/users.js");

const follow = async (userId, followUserId) => {
    const foundUser1 = await User.findById(userId);
    if (!foundUser1) {
        throw new Error("user not found");
    };
    const foundUser2 = await User.findById(followUserId);
    if (!foundUser2) {
        throw new Error("followed user not found");
    };
    if (!foundUser1.following.includes(followUserId)) {
        foundUser1.following.push(followUserId);
        await foundUser1.save();
    };
    if (!foundUser2.followers.includes(userId)) {
        foundUser2.followers.push(userId);
        await foundUser2.save();
    };
    return foundUser1;
};

const unfollow = async (userId, followUserId) => {
    const foundUser1 = await User.findById(userId);
    if (!foundUser1) {
        throw new Error("user not found");
    };
    const foundUser2 = await User.findById(followUserId);
    if (!foundUser2) {
        throw new Error("unfollowed user not found");
    };
    if (foundUser1.following.includes(followUserId)) {
        foundUser1.following = foundUser1.following.filter(followUser => followUser.toString() !== followUserId);
        await foundUser1.save();
    };
    if (foundUser2.followers.includes(userId)) {
        foundUser2.followers = foundUser2.followers.filter(followUser => followUser.toString() !== userId);
        await foundUser2.save();
    };
    return foundUser1;
};
const getAllFollowers = async (userId1, userId2) => {
    const foundUser = await User.findById(userId1).populate("followers", "username");
    if (!foundUser) {
        throw new Error("user not found");
    };
    return foundUser.followers;
};
const getAllfollowings = async (userId1, userId2) => {
    const foundUser = await User.findById(userId1).populate("following", "username");
    if (!foundUser) {
        throw new Error("user not found");
    };
    return foundUser.following;
};

module.exports = {
    follow,
    unfollow,
    getAllFollowers,
    getAllfollowings,
}