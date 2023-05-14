export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      const response = await fetch(
        `http://localhost:8080/tasks?user_id=${req.query.user_id}`
      );
      const data = await response.json();
      res.status(200).json(data);

      console.log("Fetched tasks ", data)

      break;

    case "POST":
      const newItem = {
        title: req.body.title,
        section_status: "Inbox",
        categories: req.body.categories || ["Task"],
        reminder: {
          date: req.body.reminder?.date || null,
          time: req.body.reminder?.time || "09:00",
        },
        created_at: new Date().toISOString().replace('T', ' ').slice(0, 19),
        user_id: req.body.user_id,
      };
      const postResponse = await fetch("http://localhost:8080/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItem),
      });
      const postResult = await postResponse.json();
      res.status(201).json(postResult);
      break;
    case "PUT":
      const updatedItem = req.body;
      const putResponse = await fetch(
        `http://localhost:8080/tasks/${updatedItem.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedItem),
        }
      );
      const putResult = await putResponse.json();
      res.status(200).json(putResult);
      break;
    case "DELETE":
      const itemId = req.body.id;
      const deleteResponse = await fetch(
        `http://localhost:8080/tasks?task_id=${itemId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );
      const deleteResult = await deleteResponse.json();
      res.status(200).json(deleteResult);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
