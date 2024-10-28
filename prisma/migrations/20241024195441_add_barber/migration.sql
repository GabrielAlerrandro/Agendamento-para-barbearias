-- AlterTable
ALTER TABLE "User" ADD COLUMN     "barbershopID" TEXT,
ADD COLUMN     "isBarber" BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_barbershopID_fkey" FOREIGN KEY ("barbershopID") REFERENCES "Barbershop"("id") ON DELETE SET NULL ON UPDATE CASCADE;
