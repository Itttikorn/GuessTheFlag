import { BACKEND_URL } from "./config.js";

/** @typedef {import("./config.js").Item} Item */
/** @typedef {import("./config.js").ItemPayload} ItemPayload */

export async function getItems() {
  /** @type {Item[]} */
  const items = await fetch(`${BACKEND_URL}/leaderboard`).then((r) => r.json());

  return items;
}

/**
 * @param {ItemPayload} item
 */
export async function createItem(item) {
  let result = await fetch(`${BACKEND_URL}/leaderboard`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  }).then((r) => r.json());
  return result.id;
}

/**
 * @param {string} id
 * @param {ItemPayload} item
 */
export async function editItem(id, item) {
  await fetch(`${BACKEND_URL}/leaderboard/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });
}

export async function deleteItem(id, item) {
  await fetch(`${BACKEND_URL}/items/${id}`, {
    method: "DELETE",
  });
}
