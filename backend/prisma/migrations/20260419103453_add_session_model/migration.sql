-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "gameId" INTEGER NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);
