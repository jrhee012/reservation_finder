const server = require('./server');
const DBSeeder = require('./config/db/seeds');

const port = process.env.PORT || 1337;
const dbSeeder = new DBSeeder();

process.on('exit', code => console.log(`Exiting with code ${code}`));

dbSeeder.start()
    .catch(err => {
        console.error(err);
        process.exit(1)
    })
    .then(() => {
        return server.listen(port, () => console.log(`${server.name} listening on port: ${port}`))
    });
