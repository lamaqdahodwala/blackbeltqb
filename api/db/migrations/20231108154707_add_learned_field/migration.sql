-- CreateTable
CREATE TABLE "_mastered" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_mastered_A_fkey" FOREIGN KEY ("A") REFERENCES "Question" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_mastered_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_mastered_AB_unique" ON "_mastered"("A", "B");

-- CreateIndex
CREATE INDEX "_mastered_B_index" ON "_mastered"("B");
