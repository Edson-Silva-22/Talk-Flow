import { Manager } from "socket.io-client";

const socketClient = new Manager('http://localhost:3000')
export default socketClient