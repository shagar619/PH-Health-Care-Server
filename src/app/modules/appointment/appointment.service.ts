import { IJWTPayload } from "../../types/common";


const createAppointment = async (user: IJWTPayload, payload: { doctorId: string, scheduleId: string }) => {

     return null;
}



export const AppointmentService = {
     createAppointment,
};