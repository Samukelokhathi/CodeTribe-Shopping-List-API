import { Item } from "../types/items";

let items: Item[] = [];
let currentId = 0;

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
