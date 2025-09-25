import * as SQLite from "expo-sqlite";
export async function initDatabase(db: SQLite.SQLiteDatabase) {
  // Vill droppa alla tables innan jag gör dom.

  // Skapa tabellerna som du behöver om det inte finns redan.

  await db.execAsync(
    `DROP TABLE IF EXISTS books;
  DROP TABLE IF EXISTS readingEntries;
  DROP TABLE IF EXISTS options;

    CREATE TABLE IF NOT EXISTS books (
          id TEXT PRIMARY KEY NOT NULL,
          title TEXT NOT NULL,
          author TEXT NOT NULL,
          imageUrl TEXT NOT NULL,
          infoUrl TEXT NOT NULL,
          numberofPages INTEGER
        );
    CREATE TABLE IF NOT EXISTS readingEntries (
            id TEXT PRIMARY KEY NOT NULL,
            bookId TEXT NOT NULL,
            timeOfDay TEXT NOT NULL,
            readingMinutes INTEGER NOT NULL,
            pagesRead INTEGER NOT NULL
  );
    CREATE TABLE IF NOT EXISTS options (
            id TEXT PRIMARY KEY NOT NULL,
            goalPerDay INTEGER NOT NULL,
            reminderTime TEXT NOT NULL,
            wantToBeReminded boolean NOT NULL
  );`
  );
  console.log("Database initialized 😀");
}
