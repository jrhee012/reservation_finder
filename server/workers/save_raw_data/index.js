const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');
const mongoose = require('mongoose');
const uuidv4 = require('uuid/v4');
const assign = require('lodash/assign');

require('../../models/RawData');
require('../../models/Locations');

const RawData = mongoose.model('RawData');
const Locations = mongoose.model('Locations');

class SaveRawData {
    constructor() {
        this.name = 'Save Raw Data Worker';
        this.workerFile = `${__dirname}/worker.js`;
        this.workers = {};
    }

    startWorker(name, source, data) {
        let w = new Worker(this.workerFile, {
            workerData: [
                source,
                data
            ],
        });

        w.on('message', msg => {
            console.log('message from worker:')
            console.log(msg)
        })

        w.on('error', error => {
            console.log('error from worker:');
            console.error(error);
        })

        w.on('exit', code => {
            if (code != 0) {
                console.error(new Error(`Worker stopped with exit code ${code}`));
            }
        })

        let workerId = name ? name : uuidv4();
        let workers = this.workers;
        workers[workerId] = w;
        return w;
    }

    getAllWorkers() {
        return this.workers;
    }
}

module.exports = SaveRawData;

// let a = new SaveRawData();
// a.startWorker('test');
// a.getAllWorkers();