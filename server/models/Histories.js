const mongoose = require('mongoose');

const { Schema } = mongoose;

const HistoriesSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        index: true
    },
    location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Locations',
        index: true
    },
    created_at: {
        type: Date,
        default: new Date().toISOString(),
    },
    last_updated: {
        type: Date,
        default: new Date().toISOString(),
    },
});

mongoose.model('Histories', HistoriesSchema);
