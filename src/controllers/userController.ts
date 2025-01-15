import User from '../models/User.js';

import { Request, Response } from 'express';

// Finds all users
export const getUsers = async(_req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json(err);
    }
}

// Finds a user by ID
export const getSingleUser = async(req: Request, res: Response) => {
    try {
        const user = await User.findOne({ _id: req.params.userId })
        .select('-__v');

        if (!user) {
            res.status(404).json({ message: 'No user with that ID' });
        } else {
        res.json(user);
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

// Creates a new user
export const createUser = async(req: Request, res: Response) => {
    try {
        const dbUserData = await User.create(req.body);
        res.json(dbUserData);
    } catch (err) {
        res.status(500).json(err);
    }
}

// Updates a user
export const updateUser = async(req: Request, res: Response) => {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
  
      if (!user) {
        res.status(404).json({ message: 'No user with this id!' });
      }
  
      res.json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
}

// Deletes a user
export const deleteUser = async (req: Request, res: Response) => {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });
  
      if (!user) {
        res.status(404).json({ message: 'No user with this id!' });
      }
      
        res.json({ message: 'User and associated thoughts successfully deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
}

 // Add a friend 
 export const addFriend = async (req: Request, res: Response) => {
    try {
        const friend = await User.findOne({ _id: req.params.friendId })
        .select('-__v');

        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: friend }},
            { runValidators: true, new: true }
        );

    if (!user) {
        res.status(404).json({ message: 'No user with this id!' });
    }

        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
  }

 // Delete a friend 
 export const removeFriend = async (req: Request, res: Response) => {
    try {
        const friend = await User.findOne({ _id: req.params.friendId })
        .select('-__v');

        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: friend} },
            { runValidators: true, new: true }
        );

    if (!user) {
        res.status(404).json({ message: 'No user with this id!' });
    }

        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
  }