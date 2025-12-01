import { prisma } from "../../shared/prisma";
import { IJWTPayload } from "../../types/common";
import { v4 as uuidv4 } from 'uuid';


const createAppointment = async (user: IJWTPayload, payload: { doctorId: string, scheduleId: string }) => {

     const patientData = await prisma.patient.findUniqueOrThrow({
          where: {
               email: user.email
          }
     });

     const doctorData = await prisma.doctor.findUniqueOrThrow({
          where: {
               id: payload.doctorId,
               isDeleted: false
          }
     });

     const isBookedOrNot = await prisma.doctorSchedules.findFirstOrThrow({
          where: {
               doctorId: payload.doctorId,
               scheduleId: payload.scheduleId,
               isBooked: false
          }
     });

     const videoCallingId = uuidv4();



}



export const AppointmentService = {
     createAppointment,
};