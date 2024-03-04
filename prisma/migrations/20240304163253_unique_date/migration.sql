/*
  Warnings:

  - A unique constraint covering the columns `[date]` on the table `Case` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Case_date_key" ON "Case"("date");
