/*
  Warnings:

  - You are about to alter the column `difficulty` on the `Question` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Question" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "setName" TEXT NOT NULL,
    "difficulty" INTEGER NOT NULL
);
INSERT INTO "new_Question" ("answer", "category", "difficulty", "id", "question", "setName") SELECT "answer", "category", "difficulty", "id", "question", "setName" FROM "Question";
DROP TABLE "Question";
ALTER TABLE "new_Question" RENAME TO "Question";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
