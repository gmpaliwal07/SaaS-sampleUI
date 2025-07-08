export default interface Course {
    id : number;
    title : string;
    credits : number;
    competencies? : Competency[];
}

export interface Competency {
    id : number;
    name : string;
    marks : number;
    course? : Course;
    compentencies? : Competency[];
}


export interface ApiError {
    message : string
    status?: number;
}