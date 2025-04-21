import { StudentQueryResult } from "../../infrastructure/database/repositories";
export interface IGetAllStudentsUsecase{
    execute(page?: number, limit?: number,search?:string): Promise <StudentQueryResult>
}