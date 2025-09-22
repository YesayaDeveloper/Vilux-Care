// This service is now more robust, separating core data from user data.
// This ensures that user edits cannot break the app's foundational knowledge.

interface DatabaseEntry {
  keywords: string[];
  response: string;
}

let database: DatabaseEntry[] | null = null;

/**
 * Asynchronously loads data from both the default and user databases.
 * User data is prioritized. Errors in user-database.json are handled gracefully.
 */
const loadDatabase = async (): Promise<void> => {
  if (database !== null) {
    return; // Already loaded
  }

  try {
    // Fetch default data (essential, should not fail)
    const defaultResponse = await fetch('/services/default-database.json');
    if (!defaultResponse.ok) throw new Error('Failed to load default-database.json');
    const defaultData: DatabaseEntry[] = await defaultResponse.json();

    // Fetch user data (optional, can fail gracefully without breaking the app)
    let userData: DatabaseEntry[] = [];
    try {
      const userResponse = await fetch('/services/user-database.json');
      if (userResponse.ok) {
        userData = await userResponse.json();
      } else {
        console.warn('user-database.json not found. This is normal if you haven\'t added custom data yet.');
      }
    } catch (userError) {
      console.error(
        "Could not load or parse user-database.json. Please check its format is a valid JSON array. Falling back to default data only.",
        userError
      );
      // userData remains an empty array, so the app continues to function
    }
    
    // Combine databases, with user data taking priority.
    database = [...userData, ...defaultData];

  } catch (error) {
    console.error("CRITICAL: Failed to load the default database. Local search will be disabled.", error);
    database = []; // Set to empty array on critical failure to prevent further errors.
  }
};


/**
 * Asynchronously searches the combined database for a response matching keywords in the user's message.
 * @param message The user's input message.
 * @returns A promise that resolves to the pre-defined response string if a match is found, otherwise null.
 */
export const searchDatabase = async (message: string): Promise<string | null> => {
  await loadDatabase(); // Ensure the database is loaded

  if (!database) return null;

  const lowerCaseMessage = message.toLowerCase().trim();
  if (!lowerCaseMessage) return null;
  
  for (const entry of database) {
    for (const keyword of entry.keywords) {
      // Use regex to match whole words to avoid partial matches (e.g., 'ache' in 'headache')
      const regex = new RegExp(`\\b${keyword}\\b`, 'i');
      if (regex.test(lowerCaseMessage)) {
        return entry.response;
      }
    }
  }
  return null;
};