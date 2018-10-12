const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server);

const { gamesRoute, gamesHandler } = require("./routes/games");

gamesHandler(io);

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const routes = { "/games": gamesRoute };

for (let route in routes) {
  app.use(route, routes[route]);
}

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Server listening on port ${port}...`));
