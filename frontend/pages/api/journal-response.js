export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      const response = await fetch(
        `http://localhost:8080/journal/responses/${req.query.id}`
      );
      const data = await response.json();
      res.status(200).json(data);

      console.log("Fetched responses", data);

      break;

    case "PUT":
      
    const updateResponse = await fetch(
        `http://localhost:8080/journal/responses/${req.query.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({request: req.body.response}),
        }
      );

      if (!updateResponse.ok) {
        const errorData = await updateResponse.json();
        res.status(updateResponse.status).json(errorData);
        return;
      }

      res.status(200).json({ message: "Response updated successfully" });

      break;

    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
