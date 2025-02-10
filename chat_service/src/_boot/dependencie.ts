import { IDependencies } from "../app/interfaces/IDependencies";
import * as repository from "../infrastructure/database/repository";
import * as usecases  from "../app/usecases"

export const dependencies: IDependencies = {
    usecases,
    repository
}