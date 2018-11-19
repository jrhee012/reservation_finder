const mongoose = require('mongoose');
// const logger = require('../logger');

const { Schema } = mongoose;

const RawDataSchema = new Schema({
    data: Schema.Types.Mixed,
    created_at: {
        type: Date,
        default: new Date().toISOString(),
    },
    last_updated: {
        type: Date,
        default: new Date().toISOString(),
    },
});

RawDataSchema.pre('validate', function () {
    this.last_updated = new Date().toISOString();
});

mongoose.model('RawData', RawDataSchema);
