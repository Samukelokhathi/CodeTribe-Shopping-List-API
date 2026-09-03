import { IncomingMessage, ServerResponse } from "http";
import { getItems, getItemById, addItem } from "../controllers/items";

export const itemRouterHandler = async (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  if (req.url?.startsWith("/items")) {
    console.log(req.url, "request url");

    const parts = req.url.split("/");
    console.log(parts, "url parts");

    const id = parts[2] ? parseInt(parts[2]) : undefined;

    if (req.method === "GET" && !id) {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(getItems()));
      return;
    }

    if (req.method === "GET" && id) {
      const item = getItemById(id);
      res.writeHead(item ? 200 : 400, { "content-type": "application/json" });
      res.end(JSON.stringify(item || { message: "Not found" }));
    }

    if (req.method === "POST") {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      req.on("end", () => {
        const { name, price, quantity, isPurchased } = JSON.parse(body);
        const newItem = addItem(name, price, quantity, isPurchased);
        res.writeHead(201, { "content-type": "application/json" });
      });
      return;
    }
  }
};
