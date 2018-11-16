const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const isEmpty = require('lodash/isEmpty');

const { Schema } = mongoose;

const UsersSchema = new Schema({
    local: {
        username: String,
        hash: String,
        salt: String,
        email: String,
    },
    facebook: {
        id: String,
        token: String,
        name: String,
        email: String,
    },
    twitter: {
        id: String,
        token: String,
        displayName: String,
        username: String,
    },
    google: {
        id: String,
        token: String,
        email: String,
        name: Schema.Types.Mixed,
    }
});

// middleware
// prints local attr after save
// UsersSchema.post('save', function (doc, next) {
//     let local = this.local;
//     console.log('this:', this);
//     console.log('this.local:', local);
//     next();
// });

UsersSchema.methods.setPassword = function (password) {
    this.local.salt = crypto.randomBytes(16).toString('hex');
    this.local.hash = crypto.pbkdf2Sync(
        password,
        this.local.salt,
        10000,
        512,
        'sha512',
    ).toString('hex');
};

UsersSchema.methods.validatePassword = function (password) {
    const hash = crypto.pbkdf2Sync(
        password,
        this.local.salt,
        10000,
        512,
        'sha512'
    ).toString('hex');
    return this.local.hash === hash;
};

UsersSchema.methods.generateJWT = function () {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);

    return jwt.sign({
        username: this.local.username,
        id: this._id,
        exp: parseInt(expirationDate.getTime() / 1000, 10),
    }, 'secret');
}

UsersSchema.methods.toAuthJSON = function() {
    return {
        _id: this._id,
        username: this.local.username,
        token: this.generateJWT(),
    };
};

mongoose.model('Users', UsersSchema);

// // Takes 2 parameters: this is an asynchronous post hook
// schema.post('save', function (doc, next) {
//     setTimeout(function () {
//         console.log('post1');
//         // Kick off the second post hook
//         next();
//     }, 10);
// });

// // Will not execute until the first middleware calls `next()`
// schema.post('save', function (doc, next) {
//     console.log('post2');
//     next();
// });