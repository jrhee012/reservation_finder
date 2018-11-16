const mongoose = require('mongoose');

const { Schema } = mongoose;

const RolesSchema = new Schema({
    name: String,
    scopes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Permissions', index: true }],
    created_at: {
        type: Date,
        default: new Date().toISOString(),
    },
    last_updated: {
        type: Date,
        default: new Date().toISOString(),
    },
});

mongoose.model('Roles', RolesSchema);
