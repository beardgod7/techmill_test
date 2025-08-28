import http from "http";
import App from "./app.js";

export default class Server {
  constructor(port) {
    this.port = port || process.env.PORT || 8000;

    const appInstance = new App();
    this.httpServer = http.createServer(appInstance.getExpressInstance());
  }

  start() {
    this.httpServer.listen(this.port, () => {
      console.log(`🚀 Server running on port ${this.port}`);
    });

    this._handleGracefulShutdown();
  }

  _handleGracefulShutdown() {
    const shutdown = (signal) => {
      console.log(`${signal} received. Shutting down server...`);
      this.httpServer.close(() => {
        console.log("Server closed gracefully.");
        process.exit(0);
      });
    };

    process.on("SIGINT", () => shutdown("SIGINT"));
    process.on("SIGTERM", () => shutdown("SIGTERM"));
  }
}
