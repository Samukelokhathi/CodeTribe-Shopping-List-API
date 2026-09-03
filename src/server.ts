import http, { IncomingMessage, ServerResponse } from "http";

const PORT = 3000;
const statusCode = 200;

const requestHandler = (req: IncomingMessage, res: ServerResponse) => {
  res.writeHead(statusCode, { "content-type": "application/json" });
  res.end(JSON.stringify({ message: "Testing server" }));
};

const server = http.createServer(requestHandler);

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
