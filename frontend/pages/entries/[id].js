import { useRouter } from "next/router";

const JournalEntryPage = () => {
  const router = useRouter();
  const { id } = router.query;


  const answers = router.query.answers
    ? JSON.parse(router.query.answers)
    : null;

    console.log(answers);

  // Fetch journal entry data using the `id`

  return (
    <div>
      <h1>Journal Entry {id}</h1>
      {/* Render journal entry details here */}
    </div>
  );
};

export default JournalEntryPage;
