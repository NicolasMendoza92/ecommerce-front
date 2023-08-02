import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    name: {
        type: String,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        index: { unique: true }
      },
      password: {
        type: String,
        required: true,
        trim: true,
        unique: true,
      },
      register: {
        type: Date,
        default: Date.now(),
      },
      role: {
        type: String,
        default: 'user',
        trim: true,
      },
});

export const User = models?.User || model('User', UserSchema);