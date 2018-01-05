export class Course
{
    guCourseId:string;
    guCatId:string;
    code:string;
    name:string;
    description:string;
    type:string;
    filePath:string;
    createdDate:string;
    noOfModules:number;
    moduleFinished:number;

}

export class Chapter
{
    guCourseId:string;
    guSubModuleId:string;
    code:string;
    name:string;
    description:string;
    filePath:string;
    noOfModules:number;
    moduleFinished:number;
    
}