const Thought = require("../models/thoughtModel");
const User = require("../models/userModel");

const userController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find().populate('friends').populate('thoughts');
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  getUserById: async (req, res) => {
    const { userId } = req.params;
    try {
      const user = await User.findById(userId)
        .populate("thoughts")
        .populate("friends");
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  createUser: async (req, res) => {
    const { username, email } = req.body;
    try {
      const user = await User.create({ username, email });
      res.status(201).json(user.toJSON({ virtuals: true }));
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  updateUser: async (req, res) => {
    const { userId } = req.params;
    const { username, email } = req.body;
    try {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { username, email },
        { new: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(updatedUser);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  deleteUser: async (req, res) => {
    const { userId } = req.params;
    try {
      const deletedUser = await User.findByIdAndDelete(userId);
      if (!deletedUser) {
        return res.status(404).json({ error: "User not found" });
      }
      // bonus: delete all thoughts associated with the user
      await Thought.deleteMany({ _id: { $in: deletedUser.thoughts } });
      res.json(deletedUser);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  addFriend: async (req, res) => {
    const { userId, friendId } = req.params;
    try {
      const user = await User.findByIdAndUpdate(
        userId,
        { $addToSet: { friends: friendId } },
        { new: true }
      );
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  removeFriend: async (req, res) => {
    const { userId, friendId } = req.params;
    try {
      const user = await User.findByIdAndUpdate(
        userId,
        { $pull: { friends: friendId } },
        { new: true }
      );
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

module.exports = userController;
