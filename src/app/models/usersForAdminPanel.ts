import { StudentGroup } from './studentGroup';

export class UserForAdminPanel{
    idUser: number;
    login: string;
    imie: string;
    nazwisko: string;
    studentGroup: StudentGroup;
    admin: boolean;
    teacher: boolean;
    albumNo: string;
    registerDate: Date;
}