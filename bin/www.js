import app from "../app.js";
import http from 'http';

const port = process.env.PORT || 8080;

app.set("port", port)

var server = http.createServer(app);

server.listen(port, () => console.log(`app listening on http://localhost:${port}`) );