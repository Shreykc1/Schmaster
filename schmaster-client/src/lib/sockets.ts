
import { io } from 'socket.io-client';

const URL = import.meta.env.VITE_REACT_URL; 

export const socket = io(URL, {
    transports: ['websocket'], 
});
