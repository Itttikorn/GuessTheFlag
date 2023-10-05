import { createItem, deleteItem, getItems } from "./api.js";

/** @typedef {import("./config.js").Item} Item */
/** @typedef {import("./config.js").ItemPayload} ItemPayload */

/**
 * @param {Item[]} items
 */
function drawTable(items,id) {
  /** @type {HTMLTableSectionElement} */
  const table = document.getElementById("main-table-body");

  // Clear all elements
  table.innerHTML = "";
  var rank=1;
  for (const item of items) {
    const row = table.insertRow();
    if(item._id==id){
      row.id = "my-row";
    };
    row.insertCell().innerText = rank;
    row.insertCell().innerText = item.name;
    row.insertCell().innerText = item.score;
    rank++;
  }
}

export async function fetchAndDrawTable(id) {
  const items = await getItems();

  drawTable(items,id);
}
