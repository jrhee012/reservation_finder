const server = require('./server');

const seed = require('./config/db/seeds')

const port = process.env.PORT || 1337;

process.on('exit', code => console.log(`Exiting with code ${code}`));
// process.on('SIGINT', function () {
//     console.log('Got SIGINT...');
//     process.exit(0);
// });

server.listen(port, () => console.log(`${server.name} listening on port: ${port}`));
