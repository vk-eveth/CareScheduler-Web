import { Doctor } from "./doctor.model";


export interface Appointment {
        appointmentId: number;
        patientId: number;
        doctor: Doctor;
        appointmentDateTime: Date;
        reasonForVisit: string;
        status: string;
        additionalNotes: string;
        sessionStartTime: Date;
        sessionEndTime: Date;
}
