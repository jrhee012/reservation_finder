const server = require('./server');

const port = process.env.PORT || 1337;

server.name = 'JENN7433';
server.listen(port, () => console.log(`${server.name} listening on ${port}`));
