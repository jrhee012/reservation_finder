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

const saveYelpData = data => {
    // console.log('aaaa', data)
    let rawData = data.businesses;
    // console.log(rawData)
    console.log(rawData.length)
    // for (let i = 0; i < rawData.length; i++) {
    //     let newEntry = new RawData();
    //     newEntry.data = newEntry;
    //     newEntry.save();
    //     console.log('saved!!!')
    // }
    return;
}

const startProcess = async () => {
    console.log('message received from the main thread!');
    // console.log(workerData)
    const source = workerData[0];
    const data = workerData[1];
    // console.log('adaaa', source)
    switch (source) {
        case 'yelp':
            return saveYelpData(data);
        default:
    }

}

startProcess().then(res => {
    return parentPort.postMessage('worker finished!');
})
