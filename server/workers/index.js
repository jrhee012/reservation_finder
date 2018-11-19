const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');
const SaveRawData = require('./save_raw_data');

// function startWorker(path, cb) {
//     let w = new Worker(path, { workerData: null });
//     w.on('message', (msg) => {
//         cb(msg)
//     })
//     w.on('error', console.error);
//     w.on('exit', (code) => {
//         if (code != 0)
//             console.error(new Error(`Worker stopped with exit code ${code}`))
//     });
//     return w;
// }

// if (isMainThread) {
//     console.log('This is the main thread')
//     let w = startWorker(__filename, console.log);
//     console.log('waiting for worker!');
// } else {
//     console.log(workerData)
//     console.log('sending to parent!');
//     setTimeout(() => parentPort.postMessage({ text: 'hi!' }), 5000);
// }

module.exports = {
    SaveRawDataWorker: SaveRawData,
};
