/* eslint-disable no-console */
const chalk = require('chalk');

const convertToString = arg => {
    let result = arg;
    if (typeof arg !== 'string') {
        let string = undefined;
        try {
            string = JSON.stringify(arg);
        } catch (e) {
            console.log(e);
        }
        if (string == undefined) {
            return '';
        }
    }
    return result;
}

exports.info = (...args) => {
    if (args.length < 1) {
        console.log('');
        return;
    }

    let finalString = '';
    for (let i = 0; i < args.length; i++) {
        let str = convertToString(args[i]);
        finalString += (i == 0) ? str : ` ${str}`;
    }

    console.log(finalString);
}