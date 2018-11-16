const mongoose = require('mongoose');
const find = require('lodash/find');

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

module.exports = class DBSeeder {
    /**
     * Helper class representing DBSeeder to interact with the database if
     * needed. Should only be accessed by `admin` users.
     *
     * Allowed methods:
     *
     * `removeAll(modelName)`
     *
     * `seed(modelName)`
     *
     * `findAllAndUpdate()`
     *
     * `assignPermissions()`
     *
     * `start()`
     */
    constructor() {
        console.log('starting db initializer!');
    }

    help() {
        let helpMessage = 'this is help!';
        return helpMessage;
    }

    /**
     * Removes all entries from `modelName`. If none is provided, removes
     * all entries from MongoDB.
     *
     * @param {String} modelName String value of the name of the model
     */
    async removeAll(modelName) {
        if (!modelName) {
            let permissions = new Promise((resolve, reject) => {
                Permissions.deleteMany({}, function (err) {
                    if (err) {
                        console.log('mongodb REMOVE err!');
                        // console.error(err);
                        reject(err);
                    }
                    resolve();
                });
            })

            let roles = new Promise((resolve, reject) => {
                Roles.deleteMany({}, function (err) {
                    if (err) {
                        console.log('mongodb REMOVE err!');
                        // console.error(err);
                        reject(err);
                    }
                    resolve();
                });
            })

            try {
                console.log('starting remove all...');
                await Promise.all([permissions, roles]);
                console.log('remove all finished successfully');
            } catch (e) {
                console.log('error remove all!');
                console.error(e);
            }

            return;
        }

        return new Promise((resolve, reject) => {
            if (modelName.toLowerCase() === 'permissions') {
                Permissions.deleteMany({}, function (err) {
                    if (err) {
                        console.log('mongodb REMOVE err!');
                        // console.error(err);
                        reject(err);
                    }
                    resolve();
                });
            }

            if (modelName.toLowerCase() === 'roles') {
                Roles.deleteMany({}, function (err) {
                    if (err) {
                        console.log('mongodb REMOVE err!');
                        // console.error(err);
                        reject(err);
                    }
                    resolve();
                });
            }
        })
    }

    /**
     * Seeds initial data for `modelName` to MongoDB and returns an array
     * of seeded data for `modelName`. If no `modelName` is provided,
     * returns an empty array - `[]`.
     *
     * @param {String} modelName String value of the name of the model
     */
    async seed(modelName) {
        console.log('starting seeding for PERMISSIONS');
        if (modelName.toLowerCase() === 'permissions') {
            let permissions = [];
            try {
                permissions = await Permissions.create(defaultPermissions);
                console.log('all `PERMISSIONS` saved to db!');
            } catch (e) {
                console.log('`PERMISSIONS` seeding ERROR!');
                console.error(e);
                return process.exit(1);
            }
            return permissions;
        } else if (modelName.toLowerCase() === 'roles') {
            let roles = [];
            try {
                roles = await Roles.create(defaultRoles);
                console.log('all `ROLES` saved to db!');
            } catch (e) {
                console.log('`ROLES` seeding ERROR!');
                console.error(e);
                return process.exit(1);
            }
            return roles;
        }

        return [];
    }

    /**
     * Returns an object with arrays of `Roles` and `Permissions` entries
     *  with `modelName` (i.e. `permissions` or `roles`) as the key.
     */
    async findAllAndUpdate() {
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
            return process.exit(1);
        }

        if (results.permissions.length !== defaultPermissions.length) {
            try {
                await this.removeAll('permissions');
            } catch (e) {
                console.error(e);
                return process.exit(1);
            }

            results.permissions = await this.seed('permissions');
        }

        if (results.roles.length !== defaultRoles.length) {
            try {
                await this.removeAll('roles');
            } catch (e) {
                console.error(e);
                return process.exit(1);
            }

            results.roles = await this.seed('roles');
        }

        await this.assignPermissions();

        return results;
    }

    /**
     * Assign roles with corresponding permissions.
     */
    async assignPermissions() {
        let permissions = await Permissions.find({});
        let admin_permissions = [];
        let user_permissions = [];

        permissions.forEach(perm => {
            admin_permissions.push(perm._id);

            if (perm.name === 'read'
            || perm.name === 'write'
            || perm.name === 'update') {
                user_permissions.push(perm._id);
            }
        })

        let roles = await Roles.find({});

        let admin = find(roles, { name: 'admin' });
        admin.scopes = admin_permissions;
        await admin.save();

        let user = find(roles, { name: 'user' });
        user.scopes = user_permissions;
        await user.save();

        console.log('updated roles!');
    }

    /**
     * Initialize DBSeeder to check for DB entries requirements and
     * create entries if missing.
     */
    async start() {
        console.log('initializing db seeds...');
        // let results = await this.findAllAndUpdate();
        await this.findAllAndUpdate();
        // console.log(`seed results: ${JSON.stringify(results)}`);
        console.log('db seed finished successfully!');
    }
}
