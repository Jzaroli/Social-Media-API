import { Schema, Document, model } from 'mongoose';
import Reaction from './Reaction.js';

interface IThought extends Document { 
    thoughtText: string;
    createdAt: Date;
    username: string;
    reactions: typeof Reaction[];
}

// Schema to create Thought model
const thoughtSchema = new Schema<IThought>(
    {
        thoughtText: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [Reaction],
    },
    {
      toJSON: {
        virtuals: true,
      },
      id: false,
    }
);

// Create a virtual property `reactionCount` that gets the amount of reactions per thought
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions?.length;
});

const Thought = model('thought', thoughtSchema);

export default Thought