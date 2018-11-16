const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const isEmpty = require('lodash/isEmpty');

const { Schema } = mongoose;

const SavesSchema = new Schema({
    location_info: Schema.Types.Mixed,
    created_at: {
        type: Date,
        required: true,
        default: new Date(),
    },
    last_updated: {
        type: Date,
        required: true,
        default: new Date(),
    }
});

SavesSchema.pre('save', function () {
    // You can also return a promise that rejects
    return new Promise((resolve, reject) => {
        reject(new Error('something went wrong'));
    });

});

// middleware
// prints local attr after save
// SavesSchema.post('save', function (doc, next) {
//     let local = this.local;
//     console.log('this:', this);
//     console.log('this.local:', local);
//     next();
// });

// SavesSchema.methods.setPassword = function (password) {
//     this.local.salt = crypto.randomBytes(16).toString('hex');
//     this.local.hash = crypto.pbkdf2Sync(
//         password,
//         this.local.salt,
//         10000,
//         512,
//         'sha512',
//     ).toString('hex');
// };

// SavesSchema.methods.validatePassword = function (password) {
//     const hash = crypto.pbkdf2Sync(
//         password,
//         this.local.salt,
//         10000,
//         512,
//         'sha512'
//     ).toString('hex');
//     return this.local.hash === hash;
// };

// SavesSchema.methods.generateJWT = function () {
//     const today = new Date();
//     const expirationDate = new Date(today);
//     expirationDate.setDate(today.getDate() + 60);

//     return jwt.sign({
//         username: this.local.username,
//         id: this._id,
//         exp: parseInt(expirationDate.getTime() / 1000, 10),
//     }, 'secret');
// }

// SavesSchema.methods.toAuthJSON = function () {
//     return {
//         _id: this._id,
//         username: this.local.username,
//         token: this.generateJWT(),
//     };
// };

mongoose.model('Saves', SavesSchema);
