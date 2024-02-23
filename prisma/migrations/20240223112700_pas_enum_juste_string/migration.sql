/*
  Warnings:

  - The `color` column on the `Case` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Case" DROP COLUMN "color",
ADD COLUMN     "color" TEXT NOT NULL DEFAULT 'default';

-- DropEnum
DROP TYPE "Color";
