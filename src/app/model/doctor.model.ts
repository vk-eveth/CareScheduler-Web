import { User } from './user.model';

export class Doctor {
    doctorId: number;
    userId: number;
    specialty: string;
    qualifications: string;
    experienceYears: number;
    user: User;

    constructor(doctorId: number, userId: number, specialty: string, qualifications: string, experienceYears: number, user: User) {
        this.doctorId = doctorId;
        this.userId = userId;
        this.specialty = specialty;
        this.qualifications = qualifications;
        this.experienceYears = experienceYears;
        this.user = user;
    }
}
