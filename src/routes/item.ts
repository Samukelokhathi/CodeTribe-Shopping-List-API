import { IncomingMessage, ServerResponse } from "http";
import { getItems, getItemById, addItem } from "../controllers/items";
import { error } from "console";

export const itemRouterHandler = async (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  if (req.url?.startsWith("/items")) {
    console.log(req.url, "request url");

    const parts = req.url.split("/");
    console.log(parts, "url parts");

    const id = parts[2] ? parseInt(parts[2]) : undefined;

    if (req.method === "GET" && id) {
      if (isNaN(id)) {
        res.writeHead(400, { "content-type": "application/json" });
        res.end(JSON.stringify({ error: "Invalid item ID" }));
        return;
      }
      const item = getItemById(id);
      if (!item) {
        res.writeHead(404, { "content-type": "application/json" });
        res.end(JSON.stringify({ error: "Song not found" }));
        return;
      }

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(item));
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

        try {
          if (!name || typeof name !== "string") {
            res.writeHead(400, { "content-type": "application/json" });
            res.end(JSON.stringify({ error: "Item name is required" }));
          }
          if (!price || typeof price !== "number") {
            res.writeHead(400, { "content-type": "application/json" });
            res.end(JSON.stringify({ error: "Item price is required" }));
          }
          if (!quantity || typeof quantity !== "number") {
            res.writeHead(400, { "content-type": "application/json" });
            res.end(JSON.stringify({ error: "Item quantity is required" }));
          }
          if (!isPurchased || typeof isPurchased !== "boolean") {
            res.writeHead(400, { "content-type": "application/json" });
            res.end(JSON.stringify({ error: "Item isPurchased is required" }));
          }

          const newItem = addItem(name, price, quantity, isPurchased);
          res.writeHead(201, { "content-type": "application/json" });
          res.end(JSON.stringify(newItem));
        } catch (error) {
          res.writeHead(400, { "content-type": "application/json" });
          res.end(JSON.stringify({ error: "Invalid JSON payload" }));
        }
      });
      return;
    }
    res.writeHead(405, { "content-type": "application/json" });
    res.end(JSON.stringify({ error: "Method not allowed on /Items" }));
  }
};
