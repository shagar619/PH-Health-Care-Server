import { stripe } from "../../helper/stripe";
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

     // eslint-disable-next-line @typescript-eslint/no-unused-vars
     const isBookedOrNot = await prisma.doctorSchedules.findFirstOrThrow({
          where: {
               doctorId: payload.doctorId,
               scheduleId: payload.scheduleId,
               isBooked: false
          }
     });

     const videoCallingId = uuidv4();

     const result = await prisma.$transaction(async (tnx) => {

          const appointmentData = await tnx.appointment.create({
               data: {
                    patientId: patientData.id,
                    doctorId: doctorData.id,
                    scheduleId: payload.scheduleId,
                    videoCallingId
               }
          })

          await tnx.doctorSchedules.update({
               where: {
                    doctorId_scheduleId: {
                         doctorId: doctorData.id,
                         scheduleId: payload.scheduleId
                    }
               },
               data: {
                    isBooked: true
               }
          })

          const transactionId = uuidv4();

          await tnx.payment.create({
               data: {
                    appointmentId: appointmentData.id,
                    amount: doctorData.appointmentFee,
                    transactionId
               }
          })


          // payment integration
          const session = await stripe.checkout.sessions.create({
               payment_method_types: ["card"],
               mode: "payment",
               customer_email: user.email,
               line_items: [
                    {
                         price_data: {
                              currency: "bdt",
                              product_data: {
                                   name: `Appointment with ${doctorData.name}`
                              },
                              unit_amount: doctorData.appointmentFee * 100,
                         },
                         quantity: 1
                    },
               ],
               metadata: {
                    appointmentId: appointmentData.id,
                    paymentId: patientData.id
               },
               success_url: `https://www.facebook.com/619shagar`,
               cancel_url: `https://x.com/619_shagar`
          });

          return { paymentUrl: session.url };
     });

     return result;
}



export const AppointmentService = {
     createAppointment,
};