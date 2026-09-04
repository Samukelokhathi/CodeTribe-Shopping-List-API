import { IncomingMessage, ServerResponse } from "http";
import {
  getItems,
  getItemById,
  addItem,
  updateItem,
  deleteItem,
} from "../controllers/items";

export const itemRouterHandler = async (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  if (req.url?.startsWith("/items")) {
    console.log(req.url, "request url");

    const parts = req.url.split("/");
    console.log(parts, "url parts");

    const id = parts[2] ? parseInt(parts[2]) : undefined;

    // GET /items
    if (req.method === "GET" && id === undefined) {
      const items = getItems();

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(items));
      return;
    }

    // GET /items/:id
    if (req.method === "GET" && id !== undefined) {
      if (isNaN(id)) {
        res.writeHead(400, { "content-type": "application/json" });
        res.end(JSON.stringify({ error: "Invalid item ID" }));
        return;
      }

      const item = getItemById(id);

      if (!item) {
        res.writeHead(404, { "content-type": "application/json" });
        res.end(JSON.stringify({ error: "Item not found" }));
        return;
      }

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(item));
      return;
    }

    // POST /items
    if (req.method === "POST") {
      let body = "";

      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      req.on("end", () => {
        try {
          const { name, price, quantity, isPurchased } = JSON.parse(body);

          if (!name || typeof name !== "string") {
            res.writeHead(400, { "content-type": "application/json" });
            res.end(JSON.stringify({ error: "Item name is required" }));
            return;
          }

          if (typeof price !== "number") {
            res.writeHead(400, { "content-type": "application/json" });
            res.end(JSON.stringify({ error: `Item ${price} is required ` }));
            return;
          }

          if (typeof quantity !== "number") {
            res.writeHead(400, { "content-type": "application/json" });
            res.end(JSON.stringify({ error: "Item quantity is required" }));
            return;
          }

          if (typeof isPurchased !== "boolean") {
            res.writeHead(400, { "content-type": "application/json" });
            res.end(
              JSON.stringify({
                error: "Item isPurchased is required",
              }),
            );
            return;
          }

          // Controller expects:
          // addItem(name, quantity, isPurchased, price)
          const newItem = addItem(name, quantity, isPurchased, price);

          res.writeHead(201, { "content-type": "application/json" });
          res.end(JSON.stringify(newItem));
        } catch (error) {
          res.writeHead(400, { "content-type": "application/json" });
          res.end(JSON.stringify({ error: "Invalid JSON payload" }));
        }
      });

      return;
    }

    // PUT /items/:id
    if (req.method === "PUT" && id !== undefined) {
      if (isNaN(id)) {
        res.writeHead(400, { "content-type": "application/json" });
        res.end(JSON.stringify({ error: "Invalid item ID" }));
        return;
      }

      let body = "";

      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      req.on("end", () => {
        try {
          const updates = JSON.parse(body);
          const updatedItem = updateItem(id, updates);

          if (!updatedItem) {
            res.writeHead(404, { "content-type": "application/json" });
            res.end(JSON.stringify({ message: "Not found" }));
            return;
          }

          res.writeHead(200, { "content-type": "application/json" });
          res.end(JSON.stringify(updatedItem));
        } catch (error) {
          res.writeHead(400, { "content-type": "application/json" });
          res.end(JSON.stringify({ error: "Invalid JSON payload" }));
        }
      });

      return;
    }

    // DELETE /items/:id
    if (req.method === "DELETE" && id !== undefined) {
      if (isNaN(id)) {
        res.writeHead(400, { "content-type": "application/json" });
        res.end(JSON.stringify({ error: "Invalid item ID" }));
        return;
      }

      const deletedItem = deleteItem(id);

      if (!deletedItem) {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            message: "Item not found",
          }),
        );
        return;
      }

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Item deleted successfully",
          item: deletedItem,
        }),
      );

      return;
    }

    res.writeHead(405, { "content-type": "application/json" });
    res.end(JSON.stringify({ error: "Method not allowed on /items" }));
    return;
  }

  res.writeHead(405, { "content-type": "application/json" });
  res.end(JSON.stringify({ error: "Method not allowed on /items" }));
};
