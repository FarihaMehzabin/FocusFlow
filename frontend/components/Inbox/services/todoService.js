export const addItem = async (title, categories, user_id, priority) => {

  console.log("Prio set to", priority); 
  const response = await fetch("/api/items", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, categories, user_id, section: "Inbox", priority }),
  });

  if (response.ok) {
    const data = await response.json();
    return data.id; // return the id of the new item
  }
  throw new Error("Error adding item.");
};


export const deleteItem = async (id, user_id) => {
  await fetch("/api/items", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, user_id }),
  });
};

export const editItem = async (updatedItem, user_id) => {
  await fetch("/api/items", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...updatedItem, user_id }), // put updatedItem and user_id into an object
  });
};

export const changeSectionStatus = async (id, from, to) => {
  await fetch(`/api/change-sections?from=${from}&to=${to}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }), // put updatedItem and user_id into an object
  });
};


