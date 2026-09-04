import { Item } from "../types/items";

let items: Item[] = [];
let currentId = 1;

export const getItems = (): Item[] => {
  return items;
};
export const getItemById = (id: number): Item | undefined => {
  const item = items.find((item) => item.id === id);
  return item;
};

export const addItem = (
  name: string,
  quantity: number,
  isPurchased: boolean,
  price: number,
): Item => {
  const newItem: Item = { id: currentId++, name, quantity, isPurchased, price };
  items.push(newItem);
  return newItem;
};

export const updateItem = (
  id: number,
  updates: Partial<Omit<Item, "id">>,
): Item | undefined => {
  const item = getItemById(id);
  if (!item) return undefined;

  if (updates.name !== undefined) item.name = updates.name;
  if (updates.isPurchased !== undefined) item.isPurchased = updates.isPurchased;
  if (updates.quantity !== undefined) item.quantity = updates.quantity;
  if (updates.price !== undefined) item.price = updates.price;

  return item;
};
