import { StudentQueryResult } from "../../infrastructure/database/repositories";


export interface IGetAllInstructorsUseCase {
    execute(page?: number, limit?: number,search?:string): Promise <StudentQueryResult>
}