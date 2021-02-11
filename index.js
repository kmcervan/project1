// require your server and launch it
const server = require('./api/server.js');

const PORT = 4001;

server.listen(PORT, () => {
    console.log(` Server Running on http://localhost:${PORT} `);
});