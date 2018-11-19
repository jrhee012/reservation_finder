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

const saveToDb = (data, index) => {
    if (index.length === data.length) {
        return;
    }
    let entry = data[index];
    entry.save
}

const saveYelpData = async (data, index) => {
    // console.log('aaaa', data)
    let rawData = data.businesses;
    // console.log(rawData)
    let newEntries = [];
    console.log(rawData.length)
    for (let i = 0; i < rawData.length; i++) {
        let newEntry = new RawData();
        newEntry.data = rawData[i];
        // newEntries.push(newEntry);
        await newEntry.save();
        console.log('finished!')
    }

    // (async function () {
    //     const url = await ngrok.connect();
    // })();

    return;
}

const startProcess = async () => {
    console.log('message received from the main thread!');
    // console.log(workerData)
    const source = workerData[0];
    const data = workerData[1];
    // let test = await RawData.find({});
    // console.log('teetetet', test);
    // console.log('adaaa', source)
    switch (source) {
        case 'yelp':
            await saveYelpData(data);
            return;
        default:
    }

}

startProcess().then(res => {
    return parentPort.postMessage('worker finished!');
})
