const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');
const mongoose = require('mongoose');

require('../models/RawData');
require('../models/Locations');

const RawData = mongoose.model('RawData');
const Locations = mongoose.model('Locations');

const getAllRawData = async () => {
    let data = await RawData.find();
}