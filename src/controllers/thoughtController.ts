import Thought from '../models/Thought.js';
import { Request, Response } from 'express';

// Finds all thoughts
export const getThoughts = async(_req: Request, res: Response) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    } catch (err) {
        res.status(500).json(err);
    }
}

// Finds a thought by ID
export const getSingleThought = async(req: Request, res: Response) => {
    try {
        const thought = await Thought.findOne({ _id: req.params.userId })
        .select('-__v');

        if (!thought) {
            res.status(404).json({ message: 'No thought with that ID' });
        } else {
        res.json(thought);
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

// Creates a new thought
export const createThought = async(req: Request, res: Response) => {
    try {
        const dbThoughtData = await Thought.create(req.body);
        res.json(dbThoughtData);
    } catch (err) {
        res.status(500).json(err);
    }
}

// Updates a thought
export const updateThought = async(req: Request, res: Response) => {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
  
      if (!thought) {
        res.status(404).json({ message: 'No thought with this id!' });
      }
  
      res.json(thought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
}

// Deletes a thought
export const deleteThought = async (req: Request, res: Response) => {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.userId });
  
      if (!thought) {
        res.status(404).json({ message: 'No thought with this id!' });
      }
      
        res.json({ message: 'thought successfully deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
}

// Add a reaction
export const addReaction = async (req: Request, res: Response) => {
  try {
      const thought = await Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $addToSet: { reactions: req.body } },
          { runValidators: true, new: true }
      );

  if (!thought) {
      res.status(404).json({ message: 'No thought with this id!' });
  }

      res.json(thought);
  } catch (err) {
      res.status(500).json(err);
  }
}

// Remove a reaction
export const removeReaction = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )

    if (!thought) {
      res.status(404).json({ message: 'No thought with this id!' });
    }

    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
}