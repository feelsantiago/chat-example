import { Schema, Document } from 'mongoose';
import * as bcrypt from 'bcrypt-nodejs';

const { Types } = Schema;

export interface User {
    readonly email: string;
    readonly name: string;
    password: string;
}

export interface UserSchema extends User, Document {
    verifyPassword(password: string, hash: string): Promise<boolean>;
}

export const UserSchema = new Schema({
    email: {
        type: Types.String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    name: {
        type: String,
        required: true,
    },
});

UserSchema.pre<UserSchema>('save', function (callback) {
    /* eslint-disable @typescript-eslint/no-this-alias */
    const user = this;

    // Break out if the password hasn't changed
    if (!user.isModified('password')) return callback();

    // Password changed so we need to hash it
    return bcrypt.genSalt(5, (err, salt) => {
        if (err) return callback(err);

        return bcrypt.hash(user.password, salt, null, (innerErr, hash) => {
            if (innerErr) return callback(innerErr);
            user.password = hash;
            return callback();
        });
    });
    /* eslint-enable @typescript-eslint/no-this-alias */
});

UserSchema.methods.verifyPassword = (password, hash) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hash, (err, isMatch) => {
            if (err) reject(new Error(err));

            resolve(isMatch);
        });
    });
};
