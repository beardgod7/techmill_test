import Server from "./server.js";

const appServer = new Server(process.env.PORT);
appServer.start();
