/*
  Warnings:

  - You are about to drop the column `log_id` on the `reminders` table. All the data in the column will be lost.
  - You are about to drop the column `recipient_id` on the `reminders` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "reminders" DROP CONSTRAINT "reminders_recipient_id_fkey";

-- DropIndex
DROP INDEX "reminder_log_reminder_id_key";

-- AlterTable
ALTER TABLE "recipients" ADD COLUMN     "reminderId" TEXT;

-- AlterTable
ALTER TABLE "reminders" DROP COLUMN "log_id",
DROP COLUMN "recipient_id";

-- AddForeignKey
ALTER TABLE "recipients" ADD CONSTRAINT "recipients_reminderId_fkey" FOREIGN KEY ("reminderId") REFERENCES "reminders"("id") ON DELETE SET NULL ON UPDATE CASCADE;
