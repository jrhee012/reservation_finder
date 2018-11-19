const mongoose = require('mongoose');
const logger = require('../../logger');

const RawData = mongoose.model('RawData');

exports.save = async data => {
    for (let i = 0; i < data.length; i++) {
        await RawData.create({
            data: data[i],
        })
    }
    // console.log('all saved!');
}
