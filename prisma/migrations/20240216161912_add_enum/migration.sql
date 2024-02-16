/*
  Warnings:

  - The `color` column on the `Case` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Color" AS ENUM ('F0F0F0', 'FF9B9B', 'BEF388', 'B4F6FF', 'FFC37C', 'CF93FF', 'AEB9FF', 'FF8CFA');

-- AlterTable
ALTER TABLE "Case" DROP COLUMN "color",
ADD COLUMN     "color" "Color" NOT NULL DEFAULT 'F0F0F0';
