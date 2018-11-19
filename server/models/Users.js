const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
// const isEmpty = require('lodash/isEmpty');
// const find = require('lodash/find');
require('./Roles');

// const Roles = mongoose.model('Roles');
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
        username: String,
        displayName: String,
        name: Schema.Types.Mixed,
        gender: String,
        profileUrl: String,
        provider: String,
        full_profile: Schema.Types.Mixed,
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
        full_profile: Schema.Types.Mixed,
    },
    instagram: {
        id: String,
        token: String,
        username: String,
        full_name: String,
        profile_picture: Schema.Types.Mixed,
    },
    roles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Roles', index: true }],
    histories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Saves', index: true }],
    created_at: {
        type: Date,
        default: new Date().toISOString(),
    },
    last_login_at: Date,
    // test: String,
});

// middleware
// prints local attr after save
// UsersSchema.post('save', function (doc, next) {
//     let local = this.local;
//     console.log('this:', this);
//     console.log('this.local:', local);
//     next();
// });

// UsersSchema.pre('update', function () {
//     this.update({}, { $set: { last_login_at: new Date() } });
// });

// UsersSchema.post('init', async function () {
//     let roles = await Roles.find({});
//     let userRole = find(roles, { name: 'user' });
//     this.roles = [userRole._id];
//     console.log('aaa', this);
// });

// UsersSchema.pre('validate', function () {
//     this.last_login_at = new Date().toISOString();
// });

// UsersSchema.pre('save', function () {
//     this.test = 'test!';
//     console.log('this: ', this);
//     // next();
// });

UsersSchema.methods.setPassword = function(password) {
    this.local.salt = crypto.randomBytes(16).toString('hex');
    this.local.hash = crypto.pbkdf2Sync(
        password,
        this.local.salt,
        10000,
        512,
        'sha512',
    ).toString('hex');
};

UsersSchema.methods.validatePassword = function(password) {
    const hash = crypto.pbkdf2Sync(
        password,
        this.local.salt,
        10000,
        512,
        'sha512'
    ).toString('hex');
    return this.local.hash === hash;
};

UsersSchema.methods.generateJWT = function() {
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
