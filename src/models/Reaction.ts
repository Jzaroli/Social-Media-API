import { Schema, Document, ObjectId, Types } from 'mongoose';

interface IReaction extends Document { 
    reactionId: ObjectId;
    reactionBody: string;
    username: string;
    createdAt: Date;
}

// Schema to create Reaction model
const reactionSchema = new Schema<IReaction>(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280,
          },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        toJSON: {
          getters: true,
        },
        id: false,
    }
);

export default reactionSchema;