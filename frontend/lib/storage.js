const STORAGE_KEY = "journalAppEntries";
const ID_COUNTER_KEY = "journalEntryIdCounter";

function getNextId() {
  // Get the current ID counter value from local storage
  const currentIdCounter = localStorage.getItem(ID_COUNTER_KEY);

  // If the ID counter is not set, initialize it with 1 and return 1
  if (currentIdCounter === null) {
    localStorage.setItem(ID_COUNTER_KEY, "1");
    return 1;
  }

  // If the ID counter is set, increment it by 1 and return the new value
  const nextId = parseInt(currentIdCounter, 10) + 1;
  localStorage.setItem(ID_COUNTER_KEY, nextId.toString());
  return nextId;
}

export function saveJournalEntry(entry) {
  // Generate a new ID for the journal entry
  entry.id = getNextId();

  const currentEntries = getJournalEntries();
  currentEntries.push(entry);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(currentEntries));
}

export function getJournalEntries() {
  const storedEntries = localStorage.getItem(STORAGE_KEY);
  if (storedEntries) {
    return JSON.parse(storedEntries);
  } else {
    return [];
  }
}

export function updateJournalEntry(index, updatedEntry) {
  const currentEntries = getJournalEntries();
  currentEntries[index] = updatedEntry;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(currentEntries));
}

export function deleteJournalEntry(index) {
  const currentEntries = getJournalEntries();
  currentEntries.splice(index, 1);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(currentEntries));
}
