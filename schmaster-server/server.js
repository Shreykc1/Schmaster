const app = require('./index');
const http = require('http');
const { initSocket } = require('./socket');


const server = http.createServer(app);
const io = initSocket(server);

const port = 3000;

server.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
});





