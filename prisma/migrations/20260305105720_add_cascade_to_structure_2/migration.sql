/*
  Warnings:

  - You are about to drop the `Structure` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProductStructure" DROP CONSTRAINT "ProductStructure_structureId_fkey";

-- DropForeignKey
ALTER TABLE "Table" DROP CONSTRAINT "Table_structureId_fkey";

-- DropTable
DROP TABLE "Structure";

-- CreateTable
CREATE TABLE "structure" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "structure_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProductStructure" ADD CONSTRAINT "ProductStructure_structureId_fkey" FOREIGN KEY ("structureId") REFERENCES "structure"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Table" ADD CONSTRAINT "Table_structureId_fkey" FOREIGN KEY ("structureId") REFERENCES "structure"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
