import mongoose, { Schema } from "mongoose";

type Usertype = {
    email: string,
    age: number,
    interests: [string],
    name: {
        firstName: string,
        lastName: string
    },
    tasks: [
        {
            title: string,
            done: boolean
        }
    ],
    password: string
}

const UserSchema = new Schema<Usertype>({
    email: { type: String, required: true },
    age: { type: Number, required: true },
    interests: [String],
    name: {
        firstName: { type: String, required: true },
        lastName: String
    },
    tasks: [
        {
            title: String,
            done: Boolean
        }
    ],
    password: { type: String, required: true }
})

export const User = mongoose.model('User', UserSchema)