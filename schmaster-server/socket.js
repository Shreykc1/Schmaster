const { Server } = require('socket.io');

let io;

const initSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: 'http://localhost:5173', // Adjust as necessary
            methods: ['GET', 'POST'],
        },
    });

    io.on('connection', (socket) => {
        console.log('A user connected');

        socket.on('disconnect', () => {
            console.log('User disconnected');
        });
    });
    io.setMaxListeners(0);

    return io; // Return the initialized io instance
};

// Function to get the io instance
const getIo = () => {
    return io;
};

module.exports = {
    initSocket,
    getIo,
};
