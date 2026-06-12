/*
  Warnings:

  - You are about to drop the column `spotifyUrl` on the `Post` table. All the data in the column will be lost.
  - Added the required column `coverImage` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `podcastUrl` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "spotifyUrl",
ADD COLUMN     "coverImage" TEXT NOT NULL,
ADD COLUMN     "podcastUrl" TEXT NOT NULL;
