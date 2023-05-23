export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "POST":
      const postResponse = await fetch(
        `http://localhost:8080/tasks/completed`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(req.body.id),
        }
      );

      const postResult = await postResponse.json();
      res.status(201).json(postResult);
      break;

    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
