import { useEffect, useState } from "react";

export function useLocalStorage<T extends { id: string }>(key: string) {
  const [items, setItems] = useState<T[]>(JSON.parse(localStorage.getItem(key) ?? "[]") as T[])
  console.log('useLocalStorage start');

  useEffect(() => {
    console.log("useEffect useLocalStorage items");
    localStorage.setItem(key, JSON.stringify(items));
  }, [items]);

  function addItem(value: T) {
    setItems([...items, value]);
  }

  function updateItem(id: string, value: T) {
    const filtered = items.filter(i => i.id != id);
    setItems([...filtered, value]);
  }

  function removeItem(id: string) {
    const filtered = items.filter(i => i.id != id);
    setItems(filtered);
  }
  function getItem(id: string) {
    return items.find(i => i.id == id);
  }

  return {
    addItem,
    removeItem,
    updateItem,
    getItem,
    items
  }

}