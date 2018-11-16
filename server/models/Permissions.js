const mongoose = require('mongoose');

const { Schema } = mongoose;

const PermissionsSchema = new Schema({
    name: String,
    // scopes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category', index: true }],
    created_at: {
        type: Date,
        default: new Date().toISOString(),
    },
    last_updated: {
        type: Date,
        default: new Date().toISOString(),
    },
});

mongoose.model('Permissions', PermissionsSchema);
