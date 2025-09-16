-- CreateEnum
CREATE TYPE "public"."ParticipationStatus" AS ENUM ('REGISTERED', 'IN_PROGRESS', 'COMPLETED', 'DISQUALIFIED');

-- CreateTable
CREATE TABLE "public"."setters" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "setters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."participants" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "participants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."contests" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "questionCount" INTEGER NOT NULL,
    "totalMarks" INTEGER NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "setterId" TEXT NOT NULL,

    CONSTRAINT "contests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."questions" (
    "id" TEXT NOT NULL,
    "problemStatement" TEXT NOT NULL,
    "checkParameter" TEXT NOT NULL,
    "marks" INTEGER NOT NULL,
    "questionOrder" INTEGER NOT NULL,
    "contestId" TEXT NOT NULL,

    CONSTRAINT "questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."contest_participations" (
    "id" TEXT NOT NULL,
    "participantId" TEXT NOT NULL,
    "contestId" TEXT NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "startedAt" TIMESTAMP(3),
    "finishedAt" TIMESTAMP(3),
    "totalScore" INTEGER NOT NULL DEFAULT 0,
    "status" "public"."ParticipationStatus" NOT NULL DEFAULT 'REGISTERED',

    CONSTRAINT "contest_participations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."submissions" (
    "id" TEXT NOT NULL,
    "participantId" TEXT NOT NULL,
    "contestId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "contestParticipationId" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "score" INTEGER NOT NULL DEFAULT 0,
    "isCorrect" BOOLEAN NOT NULL DEFAULT false,
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "attemptNumber" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "submissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."leaderboard" (
    "id" TEXT NOT NULL,
    "contestId" TEXT NOT NULL,
    "participantId" TEXT NOT NULL,
    "participantName" TEXT,
    "totalScore" INTEGER NOT NULL,
    "rank" INTEGER NOT NULL,
    "finishedAt" TIMESTAMP(3),

    CONSTRAINT "leaderboard_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "setters_email_key" ON "public"."setters"("email");

-- CreateIndex
CREATE UNIQUE INDEX "participants_email_key" ON "public"."participants"("email");

-- CreateIndex
CREATE UNIQUE INDEX "questions_contestId_questionOrder_key" ON "public"."questions"("contestId", "questionOrder");

-- CreateIndex
CREATE UNIQUE INDEX "contest_participations_participantId_contestId_key" ON "public"."contest_participations"("participantId", "contestId");

-- CreateIndex
CREATE UNIQUE INDEX "submissions_contestParticipationId_questionId_attemptNumber_key" ON "public"."submissions"("contestParticipationId", "questionId", "attemptNumber");

-- CreateIndex
CREATE UNIQUE INDEX "leaderboard_contestId_participantId_key" ON "public"."leaderboard"("contestId", "participantId");

-- AddForeignKey
ALTER TABLE "public"."contests" ADD CONSTRAINT "contests_setterId_fkey" FOREIGN KEY ("setterId") REFERENCES "public"."setters"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."questions" ADD CONSTRAINT "questions_contestId_fkey" FOREIGN KEY ("contestId") REFERENCES "public"."contests"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."contest_participations" ADD CONSTRAINT "contest_participations_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "public"."participants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."contest_participations" ADD CONSTRAINT "contest_participations_contestId_fkey" FOREIGN KEY ("contestId") REFERENCES "public"."contests"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."submissions" ADD CONSTRAINT "submissions_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "public"."participants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."submissions" ADD CONSTRAINT "submissions_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "public"."questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."submissions" ADD CONSTRAINT "submissions_contestParticipationId_fkey" FOREIGN KEY ("contestParticipationId") REFERENCES "public"."contest_participations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
