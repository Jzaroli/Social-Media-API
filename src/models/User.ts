import { Schema, Document, model } from 'mongoose';

interface IUser extends Document {
    username: string;
    email: string;
    thoughts?: [];
    friends?: [];
   }

// Schema to create User model
const userSchema = new Schema<IUser>(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: function (value) {
                  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
                },
                message: 'Invalid email address format',
              },
        },
        thoughts: [],
        friends: [],
    },
    {
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
