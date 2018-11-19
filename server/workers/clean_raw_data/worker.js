const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');
const mongoose = require('mongoose');

require('../../models/RawData');
require('../../models/Locations');

const RawData = mongoose.model('RawData');
const Locations = mongoose.model('Locations');

const getAllRawData = async () => {
    let data = await RawData.find();
    return data;
}

const buildErrResp = e => {
    let msg = {
        status: e.status || 'ERROR',
        message: e.message,
    };
    return msg;
}

const startProcess = async () => {
    // get all data
    let data = [];
    try {
        data = await RawData.find();
    } catch (e) {
        console.log('ERROR get all raw data');
        console.error(e);
        return parentPort.postMessage(buildErrResp(e));
    }
}

// setTimeout(() => parentPort.postMessage({ text: 'hi!' }), 10000);

