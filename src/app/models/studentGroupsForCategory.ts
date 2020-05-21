import { StudentGroup } from './studentGroup';

export interface StudentGroupsForCategory{
    
    allGroups: StudentGroup[];
    signedGroupsSimple: string[];
    otherGroupsSimple: string[];
}