import { Schema, Document, model, ObjectId } from 'mongoose';

interface IUser extends Document {
    username: string;
    email: string;
    thoughts?: ObjectId[];
    friends?: ObjectId[];
   }

// Schema to create User model
const userSchema = new Schema<IUser>(
    {
        username: String,
        email: Number,
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'thought',
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'friend',
            },
        ],
    },
    {
        // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
        // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
        toJSON: {
        virtuals: true,
        },
        id: false,
    }
);

// Create a virtual property `friendCount` that gets the amount of friends per user
userSchema.virtual('friendCount').get(function () {
    return this.friends?.length;
  });

const User = model('user', userSchema);

export default User
