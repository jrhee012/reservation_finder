const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

function startWorker(path, cb) {
    let w = new Worker(path, { workerData: null });
    w.on('message', (msg) => {
        cb(msg)
    })
    w.on('error', console.error);
    w.on('exit', (code) => {
        if (code != 0)
            console.error(new Error(`Worker stopped with exit code ${code}`))
    });
    return w;
}

if (isMainThread) {
    console.log('This is the main thread')

    // let w = new Worker(__filename, { workerData: 111 });
    // w.on('message', (msg) => { //A message from the worker!
    //     console.log('received message from worker!');
    //     console.log(msg.text);
    // })
    // w.on('error', console.error);
    // w.on('exit', code => {
    //     if (code != 0)
    //         console.error(new Error(`Worker stopped with exit code ${code}`))
    // });

    let w = startWorker(__filename, console.log);
    // console.log('w ', w);
    console.log('waiting for worker!');
} else { //the worker's code
    console.log(workerData)
    console.log('sending to parent!');
    setTimeout(() => parentPort.postMessage({ text: 'hi!' }), 5000);
}
