const pino = require('pino');

const pinoLogger = pino({
    // define logger options here
}, pino.destination(`${__dirname}/server.log`));

export default pinoLogger;
