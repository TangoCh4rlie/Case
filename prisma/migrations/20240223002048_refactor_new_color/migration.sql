/*
  Warnings:

  - The values [F0F0F0,FF9B9B,BEF388,B4F6FF,FFC37C,CF93FF,AEB9FF,FF8CFA,FADBCD] on the enum `Color` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Color_new" AS ENUM ('default', 'joy', 'anger', 'zen', 'sadness', 'laziness', 'motivated', 'love', 'anxious');
ALTER TABLE "Case" ALTER COLUMN "color" DROP DEFAULT;
ALTER TABLE "Case" ALTER COLUMN "color" TYPE "Color_new" USING ("color"::text::"Color_new");
ALTER TYPE "Color" RENAME TO "Color_old";
ALTER TYPE "Color_new" RENAME TO "Color";
DROP TYPE "Color_old";
ALTER TABLE "Case" ALTER COLUMN "color" SET DEFAULT 'default';
COMMIT;

-- AlterTable
ALTER TABLE "Case" ALTER COLUMN "color" SET DEFAULT 'default';
