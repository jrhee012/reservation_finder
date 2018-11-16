const mongoose = require('mongoose');

require('../../models/Permissions');
require('../../models/Roles');

const Permissions = mongoose.model('Permissions');
const Roles = mongoose.model('Roles');

const defaultPermissions = [
    {
        name: 'read',
    },
    {
        name: 'write',
    },
    {
        name: 'update',
    },
    {
        name: 'delete',
    },
];

const defaultRoles = [
    {
        name: 'admin',
    },
    {
        name: 'user',
    },
];

const seed = async function (modelName) {
    console.log('starting seeding for PERMISSIONS');
    let permissions = [];
    let roles = []
    try {
        permissions = await Permissions.create(defaultPermissions);
        console.log('all `model:PERMISSIONS` saved to db!');
    } catch (e) {
        console.log('`model:PERMISSIONS` seeding ERROR!');
        console.error(e);
        return process.exit(1);
    }
    return permissions;
}

const findAll = async function(modelName) {
    let results = {
        permissions: [],
        roles: [],
    };

    try {
        results.permissions = await Permissions.find({});
        results.roles = await Roles.find({});
    } catch (e) {
        console.log('FINDALL ERROR!');
        console.error(e);
    }

    if (results.permissions.length !== defaultPermissions.length) {
        await removeAll('permissions');
        result.permissions = await seed('permissions');
    }

    if (results.roles.length !== defaultRoles.length) {
        await removeAll('roles');
        result.roles = await seed('roles');
    }

    return results;
}

const removeAll = function(modelName) {
    return new Promise((resolve) => {
        if (modelName.toLowerCase() === 'permissions') {
            Permissions.deleteMany({}, function (err) {
                if (err) {
                    console.log('mongodb REMOVE err!');
                    console.error(err);
                }
                resolve();
            });
        }

        if (modelName.toLowerCase() === 'roles') {
            Roles.deleteMany({}, function (err) {
                if (err) {
                    console.log('mongodb REMOVE err!');
                    console.error(err);
                }
                resolve();
            });
        }
    })
}

const check = async function() {
    let allEntries = await findAll();
    if (permissions.length !== defaultPermissions.length) {
        // console.log('start');
        await removeAll('Permissions');
        // console.log('finished')
    }
    let roles = await
}

