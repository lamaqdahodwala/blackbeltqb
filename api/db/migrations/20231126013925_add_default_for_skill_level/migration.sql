-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "hashedPassword" TEXT NOT NULL,
    "salt" TEXT NOT NULL,
    "resetToken" TEXT,
    "resetTokenExpiresAt" DATETIME,
    "skillLevel" INTEGER NOT NULL DEFAULT 1
);
INSERT INTO "new_User" ("hashedPassword", "id", "resetToken", "resetTokenExpiresAt", "salt", "skillLevel", "username") SELECT "hashedPassword", "id", "resetToken", "resetTokenExpiresAt", "salt", "skillLevel", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
