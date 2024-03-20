const Thought = require("../models/thoughtModel");
const User = require("../models/userModel");

const thoughtController = {
  getAllThoughts: async (req, res) => {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  getThoughtById: async (req, res) => {
    const { thoughtId } = req.params;
    try {
      const thought = await Thought.findById(thoughtId).populate("reactions");
      if (!thought) {
        return res.status(404).json({ error: "Thought not found" });
      }
      res.json(thought);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  createThought: async (req, res) => {
    const { thoughtText, username, userId } = req.body;
    try {
      const thought = await Thought.create({ thoughtText, username });
      const user = await User.findOne({ username, _id: userId });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      user.thoughts.push(thought._id);
      await user.save();
      res.status(201).json(thought);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  updateThought: async (req, res) => {
    const { thoughtId } = req.params;
    const { thoughtText } = req.body;
    try {
      const updatedThought = await Thought.findByIdAndUpdate(
        thoughtId,
        { thoughtText },
        { new: true }
      );
      if (!updatedThought) {
        return res.status(404).json({ error: "Thought not found" });
      }
      res.json(updatedThought);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  deleteThought: async (req, res) => {
    const { thoughtId } = req.params;
    try {
      const deletedThought = await Thought.findByIdAndDelete(thoughtId);
      if (!deletedThought) {
        return res.status(404).json({ error: "Thought not found" });
      }
      res.json(deletedThought);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  createReaction: async (req, res) => {
    const { thoughtId } = req.params;
    const { reactionBody, username } = req.body;
    try {
      const thought = await Thought.findById(thoughtId);
      if (!thought) {
        return res.status(404).json({ error: "Thought not found" });
      }
      thought.reactions.push({ reactionBody, username });
      await thought.save();
      res.json(thought);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  deleteReaction: async (req, res) => {
    const { thoughtId, reactionId } = req.params;
    try {
      const thought = await Thought.findById(thoughtId);
      if (!thought) {
        return res.status(404).json({ error: "Thought not found" });
      }
      thought.reactions = thought.reactions.filter(
        (reaction) => reaction._id != reactionId
      );
      await thought.save();
      res.json(thought);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

module.exports = thoughtController;
