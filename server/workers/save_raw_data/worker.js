const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');
const mongoose = require('mongoose');

require('../../models/RawData');
require('../../models/Locations');

const RawData = mongoose.model('RawData');
const Locations = mongoose.model('Locations');

// const getAllRawData = async () => {
//     let data = await RawData.find();
//     return data;
// }

const buildErrResp = e => {
    let msg = {
        status: e.status || 'ERROR',
        message: e.message,
    };
    return msg;
}

const startProcess = async () => {
    console.log('message received from the main thread!');
    const source = workerData.source;
    const data = workerData.data;
}

startProcess().then(res => {
    return parentPort.postMessage('worker finished!');
})
