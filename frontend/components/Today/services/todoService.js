export const fetchTodos = async () => {
  const response = await fetch("/api/items");
  return await response.json();
};

export const addItem = async (newItem, categories) => {

  const parsedCategories =
      categories.trim() !== "" ? categories.split(" ") : ["Task"];
    const response = await fetch("/api/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ label: newItem, categories: parsedCategories }),
    });
  return await response.json();
};

export const deleteItem = async (id) => {
  await fetch("/api/items", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });
};

export const editItem = async (updatedItem) => {
  await fetch("/api/items", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedItem),
  });
};
