/*
  Warnings:

  - The values [EURO] on the enum `CurrencyCode` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Colour" ADD VALUE 'SILVER';
ALTER TYPE "Colour" ADD VALUE 'ORANGE';
ALTER TYPE "Colour" ADD VALUE 'BROWN';
ALTER TYPE "Colour" ADD VALUE 'PURPLE';
ALTER TYPE "Colour" ADD VALUE 'GREY';
ALTER TYPE "Colour" ADD VALUE 'PINK';
ALTER TYPE "Colour" ADD VALUE 'GOLD';

-- AlterEnum
BEGIN;
CREATE TYPE "CurrencyCode_new" AS ENUM ('NGN', 'EUR', 'USD');
ALTER TABLE "classifieds" ALTER COLUMN "currency" DROP DEFAULT;
ALTER TABLE "classifieds" ALTER COLUMN "currency" TYPE "CurrencyCode_new" USING ("currency"::text::"CurrencyCode_new");
ALTER TYPE "CurrencyCode" RENAME TO "CurrencyCode_old";
ALTER TYPE "CurrencyCode_new" RENAME TO "CurrencyCode";
DROP TYPE "CurrencyCode_old";
ALTER TABLE "classifieds" ALTER COLUMN "currency" SET DEFAULT 'NGN';
COMMIT;
