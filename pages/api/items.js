
let items = [
  {
    id: 1,
    label: "Learn VueJs",
    done: false,
    categories: ["Task"],
    reminder: { date: new Date().toISOString(), time: null }, // Add reminder object with current date
  },
  {
    id: 2,
    label: "Code a todo list",
    done: false,
    categories: ["Task"],
    reminder: { date: new Date().toISOString(), time: null }, // Add reminder object with current date
  },
  {
    id: 3,
    label: "Learn something else",
    done: false,
    categories: ["Task"],
    reminder: { date: new Date().toISOString(), time: null }, 
  },
];

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      res.status(200).json(items);
      break;
    case "POST":
      const newItem = {
        id: Math.floor(Math.random() * 9999) + 10,
        label: req.body.label,
        done: false,
        categories: req.body.categories || ["Task"],
        reminder: {
          date: req.body.reminder?.date || null,
          time: req.body.reminder?.time || "09:00",
        },
      };
      items.push(newItem);
      res.status(201).json(newItem);
      break;
    case "PUT":
      const updatedItem = req.body;
      items = items.map((item) =>
        item.id === updatedItem.id ? updatedItem : item
      );
      res.status(200).json(updatedItem);
      break;
    case "DELETE":
      const itemId = req.body.id;
      items = items.filter((item) => item.id !== itemId);
      res.status(200).json({ id: itemId });
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}