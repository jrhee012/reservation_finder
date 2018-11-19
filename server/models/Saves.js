const mongoose = require('mongoose');
// const crypto = require('crypto');
// const jwt = require('jsonwebtoken');
// const isEmpty = require('lodash/isEmpty');

const { Schema } = mongoose;

const SavesSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        index: true
    },
    location_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Locations',
        index: true
    },
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

// middlware
// TODO: TEST!!!
SavesSchema.pre('save', function () {
    this.last_updated = new Date().toISOString();
});

mongoose.model('Saves', SavesSchema);
